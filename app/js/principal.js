"use strict";
/*--------------------------------------------------------------
## Importar

*Importa archivos JavaScript para ser usados cuando la pagina haya cargado
--------------------------------------------------------------*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var JavaScript = /** @class */ (function () {
    function JavaScript(url) {
        var _this = this;
        this.url = url;
        this.elemento = document.createElement("script");
        this.elemento.src = this.url;
        console.log("Cargando: " + url);
        this.elemento.addEventListener("load", function () {
            _this.cargado();
        });
        var body = document.querySelector("body");
        body.append(this.elemento);
    }
    JavaScript.prototype.cargado = function () {
        console.log("Script: " + this.url + " cargado");
        if (this.accion != null) {
            this.accion();
        }
    };
    JavaScript.prototype.setAccion = function (accion) {
        this.accion = accion;
    };
    return JavaScript;
}());
var paquetes = new Array();
var paquetes_index = -1;
var javascript;
function cargar_javascript() {
    javascript = new JavaScript(paquetes[paquetes_index]);
    javascript.setAccion(function () {
        paquetes_index++;
        if (paquetes_index < paquetes.length) {
            console.log(paquetes_index);
            cargar_javascript();
        }
    });
}
function importar(url) {
    paquetes.push(url);
    console.log("agregado");
    if (paquetes_index == -1) {
        paquetes_index++;
        console.log(paquetes_index);
        cargar_javascript();
    }
}
console.log("Principal listo");
function testWait() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('going to wait for 5 second');
                    return [4 /*yield*/, wait(5000)];
                case 1:
                    _a.sent();
                    console.log('finally wait is over');
                    return [2 /*return*/];
            }
        });
    });
}
function wait(time) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, time);
    });
}
testWait();
