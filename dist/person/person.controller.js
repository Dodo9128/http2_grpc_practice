"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let PersonController = class PersonController {
    constructor(client) {
        this.client = client;
        this.items = [
            { id: 1, name: "Tom", email: "tom@tom.io" },
            { id: 2, name: "Tommy", email: "tommy@tommy.io" }
        ];
    }
    onModuleInit() {
        this.personService = this.client.getService('PersonService');
    }
    getMany() {
        const ids$ = new rxjs_1.ReplaySubject();
        ids$.next({ id: 1 });
        ids$.next({ id: 2 });
        ids$.complete();
        const stream = this.personService.findMany(ids$.asObservable());
        return stream.pipe((0, operators_1.toArray)());
    }
    getById(id) {
        return this.personService.findOne({ id: +id });
    }
    findOne(data) {
        return this.items.find(({ id }) => id === data.id);
    }
    findMany(data$) {
        const person$ = new rxjs_1.Subject();
        const onNext = (personById) => {
            const item = this.items.find(({ id }) => id === personById.id);
            person$.next(item);
        };
        const onComplete = () => person$.complete();
        data$.subscribe({
            next: onNext,
            complete: onComplete,
        });
        return person$.asObservable();
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], PersonController.prototype, "getMany", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], PersonController.prototype, "getById", null);
__decorate([
    (0, microservices_1.GrpcMethod)("PersonService"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], PersonController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.GrpcStreamMethod)('PersonService'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rxjs_1.Observable]),
    __metadata("design:returntype", rxjs_1.Observable)
], PersonController.prototype, "findMany", null);
PersonController = __decorate([
    (0, common_1.Controller)("person"),
    __param(0, (0, common_1.Inject)("PERSON_PACKAGE")),
    __metadata("design:paramtypes", [Object])
], PersonController);
exports.PersonController = PersonController;
//# sourceMappingURL=person.controller.js.map