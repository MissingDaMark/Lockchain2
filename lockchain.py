import binascii
import sys
import time
import Adafruit_PN532 as PN532
import RPi.GPIO as GPIO
import requests

# Setup Lock Name and Password, print to the screen once
lock_name = 'elon'
lock_password = 'teslaxoxo'
print(lock_name)
print(lock_password)

# Setup how the PN532 is connected to the Raspbery Pi.
# It is recommended to use a software SPI connection with 4 digital GPIO pins.

# Initialize state of the lock
lock_open = True

# Configuration for a Raspberry Pi:
CS   = 18
MOSI = 23
MISO = 24
SCLK = 25

# Setup Servomotor
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(12, GPIO.OUT)

# Setup LED
GPIO.setup(17, GPIO.OUT)

# Setup buttons
GPIO.setup(4, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(27, GPIO.IN, pull_up_down=GPIO.PUD_UP)

# Create an instance of the PN532 class.
pn532 = PN532.PN532(cs=CS, sclk=SCLK, mosi=MOSI, miso=MISO)

# Call begin to initialize communication with the PN532.  Must be done before
# any other calls to the PN532!
pn532.begin()

# Get the firmware version from the chip and print(it out.)
ic, ver, rev, support = pn532.get_firmware_version()
print('Found PN532 with firmware version: {0}.{1}'.format(ver, rev))

# Configure PN532 to communicate with MiFare cards.
pn532.SAM_configuration()

def update_lock():
    global lock_open
    p = GPIO.PWM(12,50)
    p.start(7.5)
    if lock_open:
        p.ChangeDutyCycle(7.5)
        time.sleep(1)
        p.ChangeDutyCycle(2.5)
        time.sleep(1)
        LED_ON()
        lock_open = False
    else:
        p.ChangeDutyCycle(12.5)
        time.sleep(1)
        LED_OFF()
        lock_open = True
    
    p.stop()
    return

def listen():
    # Main loop to detect cards and read a block.
    global lock_open

    print('Waiting for MiFare card...')
    while True:
        r = requests.get('http://192.168.1.75:5000/getData')
        data = r.json()
        allowed = data[lock_name]
        input_state_lockIn = GPIO.input(4)
        input_state_lockOut = GPIO.input(27)
        # Check if a card is available to read.
        uid = pn532.read_passive_target()
        # Try again if no card is available.
        if uid is None:
            if input_state_lockIn == True and lock_open == True:
                update_lock()
                time.sleep(2)
            elif input_state_lockIn == True and lock_open == False:
                update_lock()
                time.sleep(2)
            if input_state_lockOut == False and lock_open == True:
                update_lock()
                time.sleep(2)
                
            continue
        print('Found card with UID: 0x{0}'.format(binascii.hexlify(uid)))
        # Authenticate block 4 for reading with default key (0xFFFFFFFFFFFF).
        if not pn532.mifare_classic_authenticate_block(uid, 4, PN532.MIFARE_CMD_AUTH_B,[0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]):
            print('Failed to authenticate block 4!')
            continue
        # Read block 4 data.
        data = pn532.mifare_classic_read_block(4)
        if data is None:
            print('Failed to read block 4!')
            continue
        # Note that 16 bytes are returned, so only show the first 4 bytes for the block.
        print('Read block 4: 0x{0}'.format(binascii.hexlify(data[:4])))
        if binascii.hexlify(uid) in allowed:
            update_lock()
            time.sleep(1)

def LED_ON():
    GPIO.output(17, True)

def LED_OFF():
    GPIO.output(17, False)
    
# Get permissions from web server running blockchain


def main():
    listen()

main()
