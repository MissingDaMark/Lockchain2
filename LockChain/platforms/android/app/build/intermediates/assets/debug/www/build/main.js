webpackJsonp([9],{

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocksService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_lock__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LocksService = /** @class */ (function () {
    function LocksService(http, authService, alertCtrl, loadingCtrl) {
        this.http = http;
        this.authService = authService;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.locks = [];
    }
    LocksService.prototype.addLock = function (lock_name, public_hash, private_hash) {
        this.locks.push(new __WEBPACK_IMPORTED_MODULE_2__models_lock__["a" /* Lock */](lock_name, public_hash, private_hash));
    };
    LocksService.prototype.removeLock = function (lock_to_remove) {
        for (var i = this.locks.length - 1; i >= 0; --i) {
            if (this.locks[i].lock_name == lock_to_remove) {
                this.locks.splice(i, 1);
            }
        }
    };
    LocksService.prototype.removeLocks = function () {
        this.locks = [];
    };
    LocksService.prototype.getLocks = function () {
        return this.locks.slice();
    };
    LocksService.prototype.storeLocks = function (token) {
        var userID = this.authService.getActiveUser().uid;
        return this.http.put('https://lockchain-94649.firebaseio.com/' + userID + '/locks.json?auth=' + token, this.locks)
            .map(function (res) {
            return res.json();
        });
    };
    LocksService.prototype.fetchLocks = function (token) {
        var _this = this;
        var userID = this.authService.getActiveUser().uid;
        return this.http.get('https://lockchain-94649.firebaseio.com/' + userID + '/locks.json?auth=' + token)
            .map(function (res) {
            var locks = res.json() ? res.json() : [];
            return res.json();
        })
            .do(function (locks) {
            if (locks) {
                _this.locks = locks;
            }
            else {
                _this.locks = [];
            }
        });
    };
    LocksService.prototype.handleError = function (errorMessage) {
        var alert = this.alertCtrl.create({
            title: 'An error occured!',
            message: errorMessage,
            buttons: ['Ok']
        });
        alert.present();
    };
    LocksService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["g" /* LoadingController */]])
    ], LocksService);
    return LocksService;
}());

//# sourceMappingURL=locks.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_user__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SigninPage = /** @class */ (function () {
    function SigninPage(navCtrl, navParams, authService, loadingCtrl, alertCtrl, usersService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.usersService = usersService;
    }
    SigninPage.prototype.onSignin = function (form) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Signing you in...'
        });
        loading.present();
        this.authService.signin(form.value.email, form.value.password)
            .then(function (data) {
            _this.authService.getActiveUser().getToken()
                .then(function (token) {
                _this.usersService.getReturingUser(token)
                    .subscribe(function () { return loading.dismiss(); }, function (error) {
                    loading.dismiss();
                    _this.handleError(error.message);
                });
            });
        })
            .catch(function (error) {
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Signin Failed!',
                message: 'The email/password you entered is invalid, please try again!',
                buttons: ['Ok']
            });
            alert.present();
        });
    };
    SigninPage.prototype.handleError = function (errorMessage) {
        var alert = this.alertCtrl.create({
            title: 'An error occured!',
            message: errorMessage,
            buttons: ['Ok']
        });
        alert.present();
    };
    SigninPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signin',template:/*ion-inline-start:"C:\Users\markx\Documents\LockChain2\LockChain\src\pages\signin\signin.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Login</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    <form #f="ngForm" (ngSubmit)="onSignin(f)">\n\n      <ion-list>\n\n        <ion-item>\n\n          <ion-label fixed>Email</ion-label>\n\n          <ion-input type="email" ngModel name="email" required></ion-input>\n\n        </ion-item>\n\n        <ion-item>\n\n          <ion-label fixed>Password</ion-label>\n\n          <ion-input type="password" ngModel name="password" required></ion-input>\n\n        </ion-item>\n\n      </ion-list>\n\n      <button ion-button block type="submit" [disabled]="!f.valid">Signin</button>\n\n    </form>\n\n  </ion-content>'/*ion-inline-end:"C:\Users\markx\Documents\LockChain2\LockChain\src\pages\signin\signin.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_auth__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__services_user__["a" /* UserService */]])
    ], SigninPage);
    return SigninPage;
}());

//# sourceMappingURL=signin.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_user__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_js_sha256__ = __webpack_require__(830);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_js_sha256___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_js_sha256__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, navParams, authService, loadingCtrl, alertCtrl, userService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.userService = userService;
    }
    SignupPage.prototype.onSignupSubmit = function (form) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Signing you up...'
        });
        loading.present();
        this.userService.getUsers()
            .subscribe(function () { return console.log('works'); }, function (error) {
            _this.handleError(error.message);
        });
        if (this.userService.uIds.some(function (uIds) { return uIds['username'] === form.value.username; })) {
            loading.dismiss();
            this.handleError('The username you have choosen is already in use, please select another name!');
        }
        else {
            this.authService.signup(form.value.username, form.value.email, form.value.password)
                .then(function (data) {
                var public_hash = Object(__WEBPACK_IMPORTED_MODULE_4_js_sha256__["sha256"])(form.value.username);
                var private_hash = Object(__WEBPACK_IMPORTED_MODULE_4_js_sha256__["sha256"])(form.value.email);
                var token = _this.authService.getActiveUser().getIdToken()
                    .then(function (token) {
                    _this.userService.addNewUser(token, form.value.username, public_hash, form.value.cardId)
                        .subscribe(function () { return console.log('hi'); }, function (error) {
                        loading.dismiss();
                        _this.handleError(error.message);
                    });
                    _this.userService.storeUsers()
                        .subscribe(function () { return console.log('hi again'); }, function (error) {
                        loading.dismiss();
                        _this.handleError(error.message);
                    });
                });
                console.log(public_hash);
                console.log(_this.userService.uIds);
                console.log(_this.userService.uId);
                loading.dismiss();
            })
                .catch(function (error) {
                loading.dismiss();
                var alert = _this.alertCtrl.create({
                    title: 'Failed to Sign You up!',
                    message: 'The email you are attempting to register already exists. Please use a different email!',
                    buttons: ['Ok']
                });
                alert.present();
            });
        }
    };
    SignupPage.prototype.handleError = function (errorMessage) {
        var alert = this.alertCtrl.create({
            title: 'An error occured signing you up!',
            message: errorMessage,
            buttons: ['Ok']
        });
        alert.present();
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"C:\Users\markx\Documents\LockChain2\LockChain\src\pages\signup\signup.html"*/'\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Sign Up</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <form #f="ngForm" (ngSubmit)="onSignupSubmit(f)">\n\n    <ion-list>\n\n      <ion-item>\n\n        <ion-label fixed>Username</ion-label>\n\n        <ion-input type="username" ngModel name="username" required></ion-input>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-label fixed>Card ID</ion-label>\n\n        <ion-input type="cardId" ngModel name="cardId" required></ion-input>\n\n      </ion-item>\n\n        <ion-item>\n\n          <ion-label fixed>Email</ion-label>\n\n          <ion-input type="email" ngModel name="email" required></ion-input>\n\n        </ion-item>\n\n        <ion-item>\n\n          <ion-label fixed>Password</ion-label>\n\n          <ion-input type="password" ngModel name="password" required [minlength]="6"></ion-input>\n\n        </ion-item>\n\n      </ion-list>\n\n      <button ion-button block type="submit" color="primary" [disabled]="!f.valid">Signup</button>\n\n  </form>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\markx\Documents\LockChain2\LockChain\src\pages\signup\signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_auth__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__services_user__["a" /* UserService */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddLockPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_locks__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AddLockPage = /** @class */ (function () {
    function AddLockPage(navCtrl, navParams, actionSheetCtrl, alertCtrl, toastCtrl, authService, locksService, loadingCtrl, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.authService = authService;
        this.locksService = locksService;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.url = 'http://192.168.1.11:5000';
        this.headers = new __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        this.options = new __WEBPACK_IMPORTED_MODULE_5__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
    }
    AddLockPage.prototype.ngOnInit = function () {
        this.initializeForm();
    };
    AddLockPage.prototype.onSubmit = function () {
        var _this = this;
        var value = this.lockForm.value;
        this.locksService.addLock(value.lock_name, value.public_hash, value.private_hash);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.authService.getActiveUser().getToken()
            .then(function (token) {
            _this.http.post(_this.url + '/updateLock', {
                "lock_public_hash": value.public_hash,
                "lock_private_hash": value.private_hash,
                "remove": false
            }, _this.options)
                .subscribe(function (res) {
                console.log(res.json());
            });
            _this.locksService.storeLocks(token)
                .subscribe(function () { return loading.dismiss(); }, function (error) {
                loading.dismiss();
                _this.handleError(error.message);
            });
        })
            .catch();
        this.lockForm.reset();
        this.navCtrl.popToRoot();
    };
    AddLockPage.prototype.initializeForm = function () {
        var lock_name = '';
        var public_hash = '';
        var private_hash = '';
        this.lockForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            'lock_name': new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](lock_name, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
            'public_hash': new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](public_hash, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
            'private_hash': new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](private_hash, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required)
        });
    };
    AddLockPage.prototype.handleError = function (errorMessage) {
        var alert = this.alertCtrl.create({
            title: 'An error occured!',
            message: errorMessage,
            buttons: ['Ok']
        });
        alert.present();
    };
    AddLockPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-add-lock',template:/*ion-inline-start:"C:\Users\markx\Documents\LockChain2\LockChain\src\pages\add-lock\add-lock.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Add a Lock</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <form [formGroup]="lockForm" (ngSubmit)="onSubmit()">\n\n    <ion-list>\n\n      <ion-item>\n\n        <ion-label floating>Lock Name</ion-label>\n\n        <ion-input type="text" formControlName="lock_name"></ion-input>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-label floating>Public Hash</ion-label>\n\n        <ion-input type="text" formControlName="public_hash"></ion-input>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-label floating>Private Hash</ion-label>\n\n        <ion-input type="text" formControlName="private_hash"></ion-input>\n\n      </ion-item>\n\n    </ion-list>\n\n    <button ion-button type="submit" block [disabled]="!lockForm.valid">Add Lock</button>\n\n  </form>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\markx\Documents\LockChain2\LockChain\src\pages\add-lock\add-lock.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__services_auth__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_4__services_locks__["a" /* LocksService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* Http */]])
    ], AddLockPage);
    return AddLockPage;
}());

//# sourceMappingURL=add-lock.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddUserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_user__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AddUserPage = /** @class */ (function () {
    function AddUserPage(navCtrl, navParams, http, userService, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.userService = userService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.url = 'http://192.168.1.11:5000';
        this.headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        this.options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
    }
    AddUserPage.prototype.ngOnInit = function () {
        this.lock = this.navParams.get('lock');
    };
    AddUserPage.prototype.onAddUserSubmit = function (form) {
        var loading = this.loadingCtrl.create({
            content: 'Adding user to your lock...'
        });
        loading.present();
        if (this.userService.uIds.some(function (uIds) { return uIds['username'] === form.value.username; })) {
            var userObj = this.userService.uIds.find(function (uIds) { return uIds['username'] === form.value.username; });
            this.http.post(this.url + '/updateUser', {
                "lock_public_hash": this.lock.public_hash,
                "lock_private_hash": this.lock.private_hash,
                "client_public_hash": userObj.cardId,
                "remove": false
            }, this.options)
                .subscribe(function (data) {
                console.log(data.json());
            });
            loading.dismiss();
        }
        else {
            loading.dismiss();
            this.handleError('The user you are trying to add does not exist please add an existing user!');
        }
        this.navCtrl.popToRoot();
    };
    AddUserPage.prototype.handleError = function (errorMessage) {
        var alert = this.alertCtrl.create({
            title: 'Could not add user!',
            message: errorMessage,
            buttons: ['Ok']
        });
        alert.present();
    };
    AddUserPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-add-user',template:/*ion-inline-start:"C:\Users\markx\Documents\LockChain2\LockChain\src\pages\add-user\add-user.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Add User</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    <form #f="ngForm" (ngSubmit)="onAddUserSubmit(f)">\n\n      <ion-list>\n\n        <ion-item>\n\n          <ion-label fixed>Username</ion-label>\n\n          <ion-input type="username" ngModel name="username" required></ion-input>\n\n        </ion-item>\n\n      </ion-list>\n\n      <button ion-button block type="submit" color="primary" [disabled]="!f.valid">Signup</button>\n\n    </form>\n\n  </ion-content>\n\n'/*ion-inline-end:"C:\Users\markx\Documents\LockChain2\LockChain\src\pages\add-user\add-user.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_3__services_user__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], AddUserPage);
    return AddUserPage;
}());

//# sourceMappingURL=add-user.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditLockPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_user_add_user__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__remove_user_remove_user__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_locks__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_auth__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var EditLockPage = /** @class */ (function () {
    function EditLockPage(navCtrl, navParams, http, locksService, authService, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.locksService = locksService;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.url = 'http://192.168.1.11:5000';
        this.headers = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        this.options = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
    }
    EditLockPage.prototype.ngOnInit = function () {
        this.lock = this.navParams.get('lock');
    };
    EditLockPage.prototype.onAddUser = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__add_user_add_user__["a" /* AddUserPage */], { lock: this.lock });
    };
    EditLockPage.prototype.onRemoveUser = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__remove_user_remove_user__["a" /* RemoveUserPage */], { lock: this.lock });
    };
    EditLockPage.prototype.onRemoveLock = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.authService.getActiveUser().getToken()
            .then(function (token) {
            _this.http.post(_this.url + '/updateLock', {
                "lock_public_haxsh": _this.lock.public_hash,
                "lock_private_hash": _this.lock.private_hash,
                "remove": true
            }, _this.options)
                .subscribe(function (res) {
                console.log(res.json());
            });
            _this.locksService.removeLock(_this.lock.lock_name);
            _this.locksService.storeLocks(token)
                .subscribe(function () { return loading.dismiss(); }, function (error) {
                loading.dismiss();
                _this.handleError(error.message);
            });
        })
            .catch();
        this.navCtrl.popToRoot();
    };
    EditLockPage.prototype.handleError = function (errorMessage) {
        var alert = this.alertCtrl.create({
            title: 'An error occured!',
            message: errorMessage,
            buttons: ['Ok']
        });
        alert.present();
    };
    EditLockPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-edit-lock',template:/*ion-inline-start:"C:\Users\markx\Documents\LockChain2\LockChain\src\pages\edit-lock\edit-lock.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n      <ion-buttons end>\n\n          <button ion-button icon-only (click)="onRemoveLock()">\n\n            <ion-icon name="trash"></ion-icon>\n\n          </button>\n\n        </ion-buttons>\n\n    \n\n    <ion-title>{{lock.lock_name}}</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <h2 text-center>Public Hash</h2>\n\n  <h3 text-center border class=\'hash\'>{{lock.public_hash}}</h3>\n\n  <ion-buttons text-center>\n\n      <button ion-button full text-center (click)="onAddUser()">Add User</button>\n\n  </ion-buttons>\n\n  <ion-buttons text-center>\n\n    <button ion-button full text-center (click)="onRemoveUser()">Remove User</button>\n\n  </ion-buttons>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\markx\Documents\LockChain2\LockChain\src\pages\edit-lock\edit-lock.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_5__services_locks__["a" /* LocksService */],
            __WEBPACK_IMPORTED_MODULE_6__services_auth__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], EditLockPage);
    return EditLockPage;
}());

//# sourceMappingURL=edit-lock.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RemoveUserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_user__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RemoveUserPage = /** @class */ (function () {
    function RemoveUserPage(navCtrl, navParams, http, userService, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.userService = userService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.url = 'http://192.168.1.11:5000';
        this.headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        this.options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
    }
    RemoveUserPage.prototype.ngOnInit = function () {
        this.lock = this.navParams.get('lock');
    };
    RemoveUserPage.prototype.onRemoveUserSubmit = function (form) {
        var loading = this.loadingCtrl.create({
            content: 'Adding user to your lock...'
        });
        loading.present();
        if (this.userService.uIds.some(function (uIds) { return uIds['username'] === form.value.username; })) {
            var userObj = this.userService.uIds.find(function (uIds) { return uIds['username'] === form.value.username; });
            this.http.post(this.url + '/updateUser', {
                "lock_public_hash": this.lock.public_hash,
                "lock_private_hash": this.lock.private_hash,
                "client_public_hash": userObj.cardId,
                "remove": true
            }, this.options)
                .map(function (data) {
            });
            loading.dismiss();
        }
        else {
            loading.dismiss();
            this.handleError('The user you are trying to remove does not exist please add an existing user!');
        }
        this.navCtrl.popToRoot();
    };
    RemoveUserPage.prototype.handleError = function (errorMessage) {
        var alert = this.alertCtrl.create({
            title: 'Could not remove user!',
            message: errorMessage,
            buttons: ['Ok']
        });
        alert.present();
    };
    RemoveUserPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-remove-user',template:/*ion-inline-start:"C:\Users\markx\Documents\LockChain2\LockChain\src\pages\remove-user\remove-user.html"*/'<ion-header>\n\n\n\n    <ion-navbar>\n\n      <ion-title>Remove User</ion-title>\n\n    </ion-navbar>\n\n  \n\n  </ion-header>\n\n  \n\n  \n\n  <ion-content padding>\n\n      <form #f="ngForm" (ngSubmit)="onRemoveUserSubmit(f)">\n\n        <ion-list>\n\n          <ion-item>\n\n            <ion-label fixed>Username</ion-label>\n\n            <ion-input type="username" ngModel name="username" required></ion-input>\n\n          </ion-item>\n\n        </ion-list>\n\n        <button ion-button block type="submit" color="primary" [disabled]="!f.valid">Signup</button>\n\n      </form>\n\n    </ion-content>\n\n  '/*ion-inline-end:"C:\Users\markx\Documents\LockChain2\LockChain\src\pages\remove-user\remove-user.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_3__services_user__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], RemoveUserPage);
    return RemoveUserPage;
}());

//# sourceMappingURL=remove-user.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signin_signin__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup_signup__ = __webpack_require__(118);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var WelcomePage = /** @class */ (function () {
    function WelcomePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    WelcomePage.prototype.onSignin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__signin_signin__["a" /* SigninPage */]);
    };
    WelcomePage.prototype.onSignup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__signup_signup__["a" /* SignupPage */]);
    };
    WelcomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-welcome',template:/*ion-inline-start:"C:\Users\markx\Documents\LockChain2\LockChain\src\pages\welcome\welcome.html"*/'<ion-content id="welcome">\n\n  <div text-center padding>\n\n    <img src="assets/imgs/lock-2.png" width="180" height="180" class="marginTop"/>\n\n  </div>\n\n  <button ion-button full outline class="marginTop" (click)="onSignin()">Login</button>\n\n  <button ion-button full outline (click)="onSignup()">Sign up</button>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\markx\Documents\LockChain2\LockChain\src\pages\welcome\welcome.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], WelcomePage);
    return WelcomePage;
}());

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 212:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 212;

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add-lock/add-lock.module": [
		854,
		8
	],
	"../pages/add-new-lock/add-new-lock.module": [
		853,
		7
	],
	"../pages/add-user/add-user.module": [
		855,
		6
	],
	"../pages/edit-lock/edit-lock.module": [
		857,
		5
	],
	"../pages/edit-permissions/edit-permissions.module": [
		856,
		4
	],
	"../pages/remove-user/remove-user.module": [
		858,
		3
	],
	"../pages/signin/signin.module": [
		859,
		2
	],
	"../pages/signup/signup.module": [
		861,
		1
	],
	"../pages/welcome/welcome.module": [
		860,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 257;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase__);

var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.signup = function (username, email, password) {
        return __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.auth().createUserWithEmailAndPassword(email, password);
    };
    AuthService.prototype.signin = function (email, password) {
        return __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.auth().signInWithEmailAndPassword(email, password);
    };
    AuthService.prototype.logout = function () {
        return __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.auth().signOut();
    };
    AuthService.prototype.getActiveUser = function () {
        return __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.auth().currentUser;
    };
    return AuthService;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 433:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_nfc__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__add_lock_add_lock__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_locks__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_auth__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__edit_lock_edit_lock__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_user__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams, locksService, popoverCtrl, loadingCtrl, alertCtrl, authService, viewCtrl, nfc, ndef, userService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.locksService = locksService;
        this.popoverCtrl = popoverCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.viewCtrl = viewCtrl;
        this.nfc = nfc;
        this.ndef = ndef;
        this.userService = userService;
        this.locks = [];
    }
    HomePage.prototype.onLoadLocks = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Getting locks please wait...'
        });
        loading.present();
        var token = this.authService.getActiveUser().getIdToken()
            .then(function (token) {
            _this.locksService.fetchLocks(token)
                .subscribe(function (list) {
                loading.dismiss();
                if (list) {
                    _this.locks = list;
                }
                else {
                    _this.locks = [];
                }
            }, function (error) {
                loading.dismiss();
                _this.handleError(error.json().error);
            });
        });
        this.locks = this.locksService.getLocks();
    };
    HomePage.prototype.onUnlock = function () {
        var _this = this;
        this.nfc.addNdefFormatableListener(function () {
            console.log('successfully attached ndef listener');
        }, function (err) {
            console.log('error attaching ndef listener', err);
        }).subscribe(function (event) {
            console.log('received ndef message. the tag contains: ', event.tag);
            console.log('decoded tag id', _this.nfc.bytesToHexString(event.tag.id));
            var message = _this.ndef.textRecord(_this.userService.uId.username, "English", "Text");
            _this.nfc.write([message])
                .then()
                .catch();
        });
    };
    HomePage.prototype.onAddNewLock = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__add_lock_add_lock__["a" /* AddLockPage */]);
    };
    HomePage.prototype.onLoadLock = function (lock) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__edit_lock_edit_lock__["a" /* EditLockPage */], { lock: lock });
    };
    HomePage.prototype.handleError = function (errorMessage) {
        var alert = this.alertCtrl.create({
            title: 'An error occured loading your locks!',
            message: errorMessage,
            buttons: ['Ok']
        });
        alert.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\markx\Documents\LockChain2\LockChain\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-buttons>\n\n      <button ion-button icon-only menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-buttons end>\n\n        <button ion-button icon-only (click)="onAddNewLock()">\n\n          <ion-icon name="add"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <h1 margin-top text-center >Welcome Back</h1>\n\n    <h3 class="hash" text-center border>Test Name</h3>\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col text-center>\n\n          <button ion-button class="btn" (click)="onUnlock()">Unlock</button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n    <h3 text-center>Your Locks</h3>\n\n    <ion-buttons text-center>\n\n      <button ion-button text-center (click)="onLoadLocks()">Load Locks</button>\n\n    </ion-buttons>\n\n    <ion-list>\n\n      <button ion-item *ngFor="let lock of locks" (click)="onLoadLock(lock)">\n\n        <h2>{{lock.lock_name}}</h2>\n\n      </button>\n\n    </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\markx\Documents\LockChain2\LockChain\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__services_locks__["a" /* LocksService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__services_auth__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_nfc__["a" /* NFC */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_nfc__["b" /* Ndef */], __WEBPACK_IMPORTED_MODULE_7__services_user__["a" /* UserService */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 435:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddNewLockPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the AddNewLockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddNewLockPage = /** @class */ (function () {
    function AddNewLockPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AddNewLockPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddNewLockPage');
    };
    AddNewLockPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-add-new-lock',template:/*ion-inline-start:"C:\Users\markx\Documents\LockChain2\LockChain\src\pages\add-new-lock\add-new-lock.html"*/'<!--\n\n  Generated template for the AddNewLockPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>add-new-lock</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\markx\Documents\LockChain2\LockChain\src\pages\add-new-lock\add-new-lock.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], AddNewLockPage);
    return AddNewLockPage;
}());

//# sourceMappingURL=add-new-lock.js.map

/***/ }),

/***/ 436:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditPermissionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the EditPermissionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditPermissionsPage = /** @class */ (function () {
    function EditPermissionsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    EditPermissionsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditPermissionsPage');
    };
    EditPermissionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-edit-permissions',template:/*ion-inline-start:"C:\Users\markx\Documents\LockChain2\LockChain\src\pages\edit-permissions\edit-permissions.html"*/'<!--\n\n  Generated template for the EditPermissionsPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>edit-permissions</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\markx\Documents\LockChain2\LockChain\src\pages\edit-permissions\edit-permissions.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], EditPermissionsPage);
    return EditPermissionsPage;
}());

//# sourceMappingURL=edit-permissions.js.map

/***/ }),

/***/ 437:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(442);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 442:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(852);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_signin_signin__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_add_new_lock_add_new_lock__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_auth__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_welcome_welcome__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_add_lock_add_lock__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_locks__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_edit_lock_edit_lock__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_edit_permissions_edit_permissions__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_user__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_nfc__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_add_user_add_user__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_remove_user_remove_user__ = __webpack_require__(200);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_add_new_lock_add_new_lock__["a" /* AddNewLockPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_welcome_welcome__["a" /* WelcomePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_add_lock_add_lock__["a" /* AddLockPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_edit_lock_edit_lock__["a" /* EditLockPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_edit_permissions_edit_permissions__["a" /* EditPermissionsPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_add_user_add_user__["a" /* AddUserPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_remove_user_remove_user__["a" /* RemoveUserPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/add-new-lock/add-new-lock.module#AddNewLockPageModule', name: 'AddNewLockPage', segment: 'add-new-lock', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/add-lock/add-lock.module#AddLockPageModule', name: 'AddLockPage', segment: 'add-lock', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/add-user/add-user.module#AddUserPageModule', name: 'AddUserPage', segment: 'add-user', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/edit-permissions/edit-permissions.module#EditPermissionsPageModule', name: 'EditPermissionsPage', segment: 'edit-permissions', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/edit-lock/edit-lock.module#EditLockPageModule', name: 'EditLockPage', segment: 'edit-lock', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/remove-user/remove-user.module#RemoveUserPageModule', name: 'RemoveUserPage', segment: 'remove-user', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signin/signin.module#SigninPageModule', name: 'SigninPage', segment: 'signin', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/welcome/welcome.module#WelcomePageModule', name: 'WelcomePage', segment: 'welcome', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_10__angular_http__["c" /* HttpModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_add_new_lock_add_new_lock__["a" /* AddNewLockPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_welcome_welcome__["a" /* WelcomePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_add_lock_add_lock__["a" /* AddLockPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_edit_lock_edit_lock__["a" /* EditLockPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_edit_permissions_edit_permissions__["a" /* EditPermissionsPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_add_user_add_user__["a" /* AddUserPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_remove_user_remove_user__["a" /* RemoveUserPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_11__services_auth__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_14__services_locks__["a" /* LocksService */],
                __WEBPACK_IMPORTED_MODULE_17__services_user__["a" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_nfc__["a" /* NFC */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_nfc__["b" /* Ndef */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 545:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Lock; });
var Lock = /** @class */ (function () {
    function Lock(lock_name, public_hash, private_hash) {
        this.lock_name = lock_name;
        this.public_hash = public_hash;
        this.private_hash = private_hash;
    }
    return Lock;
}());

//# sourceMappingURL=lock.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_uid__ = __webpack_require__(829);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserService = /** @class */ (function () {
    function UserService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.uId = new __WEBPACK_IMPORTED_MODULE_3__models_uid__["a" /* UserId */]('', '', '');
        this.uIds = [];
    }
    UserService.prototype.storeUsers = function () {
        return this.http.put('https://lockchain-94649.firebaseio.com/users.json', this.uIds)
            .map(function (res) {
            return res.json();
        });
    };
    UserService.prototype.getUsers = function () {
        var _this = this;
        return this.http.get('https://lockchain-94649.firebaseio.com/users.json')
            .map(function (res) {
            var users = res.json() ? res.json() : [];
            return res.json();
        })
            .do(function (users) {
            if (users) {
                _this.uIds = users;
            }
            else {
                _this.uIds = [];
            }
        });
    };
    UserService.prototype.addNewUser = function (token, username, public_hash, cardId) {
        this.uId.publich_hash = public_hash;
        this.uId.username = username;
        this.uId.cardId = cardId;
        this.uIds.push(this.uId);
        var userID = this.authService.getActiveUser().uid;
        return this.http.put('https://lockchain-94649.firebaseio.com/' + userID + '/user.json?auth=' + token, this.uId)
            .map(function (res) {
            return res.json();
        });
    };
    UserService.prototype.getReturingUser = function (token) {
        var _this = this;
        var userID = this.authService.getActiveUser().uid;
        return this.http.get('https://lockchain-94649.firebaseio.com/' + userID + '/user.json?auth=' + token)
            .map(function (res) {
            var user = res.json() ? res.json() : null;
            return res.json();
        })
            .do(function (user) {
            if (user) {
                _this.uId = user;
            }
        });
    };
    UserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* AuthService */]])
    ], UserService);
    return UserService;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 829:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserId; });
var UserId = /** @class */ (function () {
    function UserId(username, publich_hash, cardId) {
        this.username = username;
        this.publich_hash = publich_hash;
        this.cardId = cardId;
    }
    return UserId;
}());

//# sourceMappingURL=uid.js.map

/***/ }),

/***/ 852:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_signup_signup__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_welcome_welcome__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_auth__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, menuCtrl, authService) {
        var _this = this;
        this.menuCtrl = menuCtrl;
        this.authService = authService;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.signinPage = __WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__["a" /* SigninPage */];
        this.signupPage = __WEBPACK_IMPORTED_MODULE_6__pages_signup_signup__["a" /* SignupPage */];
        this.welcomePage = __WEBPACK_IMPORTED_MODULE_7__pages_welcome_welcome__["a" /* WelcomePage */];
        this.isAuthenticated = false;
        __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.initializeApp({
            apiKey: "AIzaSyCrMN5AAX4wZRDVhxDz6L-Xq_RyCfExQIU",
            authDomain: "lockchain-94649.firebaseapp.com"
        });
        __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.isAuthenticated = true;
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
            }
            else {
                _this.isAuthenticated = false;
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_welcome_welcome__["a" /* WelcomePage */];
            }
        });
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.onLoad = function (page) {
        this.nav.setRoot(page);
        this.menuCtrl.close();
    };
    MyApp.prototype.onLogout = function () {
        this.authService.logout();
        this.menuCtrl.close();
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__["a" /* SigninPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('nav'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\markx\Documents\LockChain2\LockChain\src\app\app.html"*/'<ion-menu [content]="nav">\n\n    <ion-header *ngIf="isAuthenticated">\n\n        <ion-toolbar>\n\n            <ion-title>Menu</ion-title>\n\n        </ion-toolbar>\n\n    </ion-header>\n\n    <ion-content>\n\n        <ion-list>\n\n            <button ion-item icon-left (click)="onLogout()" *ngIf="isAuthenticated"><ion-icon name="log-out"></ion-icon>Logout</button>\n\n        </ion-list>\n\n    </ion-content>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" #nav></ion-nav>\n\n'/*ion-inline-end:"C:\Users\markx\Documents\LockChain2\LockChain\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_9__services_auth__["a" /* AuthService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[437]);
//# sourceMappingURL=main.js.map