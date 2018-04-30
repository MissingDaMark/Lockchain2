from flask import Flask
from flask import request
from datetime import datetime
import hashlib as hasher
import json
import requests

app = Flask(__name__)

# Global variables
permissions = {}
permissions.setdefault("test_lock", []).append("0x42")
locks = {}

# Define a block in the blockchain
class Block:
    def __init__(self, index, timestamp, data, previous_hash):
        self.index = index
        self.timestamp = timestamp
        self.data = data
        self.previous_hash = previous_hash
        self.hash = self.hash_block()

    def __str__(self):
        return 'Block #{}'.format(self.index)

    def hash_block(self):
        sha = hasher.sha256()
        seq = (str(x) for x in (
               self.index, self.timestamp, self.data, self.previous_hash))
        sha.update(''.join(seq).encode('utf-8'))
        return sha.hexdigest()

# Generate genesis block
def make_genesis_block():
    # Make the first block in a block-chain
    block = Block(index=0,
                  timestamp=datetime.now(),
                  data=permissions,
                  previous_hash="0")
    return block


def next_block(last_block, data):
    # Return next block in a block chain
    idx = last_block.index + 1
    block = Block(index=idx,
                  timestamp=datetime.now(),
                  data=permissions,
                  previous_hash=last_block.hash)
    return block

# This node's blockchain copy
blockchain = [make_genesis_block()]

# Store the lock data held by this node as a list
this_nodes_lockData = []
this_nodes_userData = []

@app.route('/updateLock', methods=['POST'])
def updateLock():
    # On each POST request, extract lock data
    if request.method == 'POST':
        new_lock = request.get_json()
        # Add this new lock data to the list
        this_nodes_lockData.append(new_lock)
        # For debuging, log to console
        #print("New Lock Data")
        #print("Lock Public Hash: {}".format(new_lock['lock_public_hash']))
        #print("Lock Private Hash: {}".format(new_lock['lock_private_hash']))
        #print("Remove: {}".format(new_lock['remove']))

        # Update data and post a new block to the blockchain
        lock_privateHash = new_lock['lock_private_hash']
        lock_publicHash = new_lock['lock_public_hash']
        remove = bool(new_lock['remove'])

        # Update locks
        locks[lock_publicHash] = lock_privateHash

        if remove:
            del permissions[lock_publicHash]
        else:
            permissions.setdefault(lock_publicHash, [])

        # Create new Block
        prev_block = blockchain[len(blockchain)-1]
        block = next_block(prev_block, permissions)
        blockchain.append(block)
        #print('Data: {}'.format(block.data))
        #print('Hash: {}\n'.format(block.hash))

        # Let client know it worked
        return "Lock data transmission successful\n"

@app.route('/updateUser', methods=['POST'])
def updateUser():
    # On each POST request, extract user data
    if request.method == 'POST':
        new_user = request.get_json()
        # Add this new lock data to the list
        this_nodes_userData.append(new_user)
        # For debuging, log to console
        print("New User Data")
        print("Lock Public Hash: {}".format(new_user['lock_public_hash']))
        print("Lock Private Hash: {}".format(new_user['lock_private_hash']))
        print("Client Public Hash: {}".format(new_user['client_public_hash']))
        print("Remove: {}".format(new_user['remove']))

        # Update data and post a new block to the blockchain
        lock_privateHash = new_user['lock_private_hash']
        lock_publicHash = new_user['lock_public_hash']
        client_publicHash = new_user['client_public_hash']
        remove = bool(new_user['remove'])

        # Ensure it is indeed their lock
        if lock_privateHash == locks.get(lock_publicHash):
            if remove:
                permissions[lock_publicHash].remove(client_publicHash)
            else:
                permissions.setdefault(lock_publicHash, []).append(client_publicHash)
        else:
            return "Lock Permissions Access Denied"

        # Create new Block
        prev_block = blockchain[len(blockchain)-1]
        block = next_block(prev_block, permissions)
        blockchain.append(block)
        print('Data: {}'.format(block.data))
        print('Hash: {}\n'.format(block.hash))

        # Let client know it worked
        return "User data transmission successful\n"

@app.route('/getData', methods=['GET'])
def getData():
    # On each GET request, return permissions data
    if request.method == 'GET':
        return json.dumps(blockchain[len(blockchain)-1].data)

@app.route('/')
def hello_world():
  return 'Hello from Flask!'

# node.run(host='0.0.0.0', port=5000, debug=False)
if __name__ == '__main__':
  app.run(host="0.0.0.0", port=5000)