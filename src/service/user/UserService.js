/**
 * 文件注释
 */

/**
 * 类注释需要填写
 */
class UserService {
    constructor() {
    }

    /**
     * 注释需要填写
     */
    pageUser() {
        //1.参数检查

        //2.业务逻辑处理


        //3.执行查询逻辑
        return new Promise((resolve, reject) => {
            let result =  '';

            try {
                //TODO 连网处理 http请求查询数据

                resolve(result);
            } catch(error) {
                reject(error);
            }
        });
    }

    /**
     * 登录
     * @param {*} mobile
     * @param {*} password
     */
    login(mobile, password) {

    }

    /**
     * 登出
     */
    logout() {

    }
}

/**
 *
 */
class User {
    constructor() {
        this.name = '';
        this.age = '';
    }
}

//单例
const userService = new UserService();

export  {
    userService,    //实例
    User            //类
}
