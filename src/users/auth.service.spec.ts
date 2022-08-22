import { BadRequestException, NotFoundException } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { doesNotMatch } from "assert"
import { AuthService } from "./auth.service"
import { User } from "./users.entity"
import { UsersService } from "./users.service"
describe("AuthService", () => {
    let fakeUserService: Partial<UsersService>;
    let service: AuthService
    beforeEach(async () => {
        fakeUserService = {
            findOne: () => Promise.resolve({} as User),
            create: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as User),
            findByEmail: (email: string) => Promise.resolve({ id: 1, email, password: "42b041d53e22f9a9.7fba0c50d72210a1134546ac7f8c3dd4cbace7da510c5910b2e9fe7d3489d8fc" } as User),
        }

        const module = await Test.createTestingModule({
            providers: [AuthService, {
                provide: UsersService,
                useValue: fakeUserService
            }]
        }).compile()

        service = module.get(AuthService)
    })
    it("can create instance of auth service", async () => {

        expect(service).toBeDefined();
    })
    it('create new user', async () => {
        const user = await service.sinin("۱fuck@fucker.fuck", "mother fucker")
        expect(user.password).not.toEqual("mother fucker")
        const [salt, hash] = user.password.split(".")
        expect(salt).toBeDefined()
        expect(hash).toBeDefined()
    })
    it("signup user", async () => {
        fakeUserService.findByEmail = () => Promise.resolve({} as User)
        // try {
        const res = await service.sinup("fuck@fucker.fuck", "mother fucker")
        expect(res.id).toBeDefined()
        console.log("---> sign up", res)
        // } catch (error) {
        // done()
        // }
    })
    it("signed in with un unused email", async (done) => {
        fakeUserService.findByEmail = () => Promise.resolve({} as User)
        await service.sinin("xander@gmail.com", "xxxxx").catch(e => {
            done()
        })
    })
    it("password provided", async () => {
        expect(await service.sinin("fuck@fucker.fuck", "password")).toThrow("BadRequestException")
    })
})


