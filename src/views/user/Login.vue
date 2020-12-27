<template>
  <div class="login-body-bg">
    <div class="login-card">
      <div class="login-card-bg">
        <div class="login-logo">
          <img src="../../assets/login/logo.png" />
          <h2>呼和浩特中燃气站</h2>
          <h2>数据中台系统</h2>
        </div>
        <el-form
          v-show="!tabCon"
          :model="loginForm"
          :rules="fieldRules"
          ref="loginForm"
          label-position="left"
          label-width="0px"
          class="login-form"
        >
          <el-form-item class="login-form-item">
            <el-row>
              <el-col :span="2">
                <el-form-item class="bgwhite">
                  <i class="el-icon-user"></i>
                </el-form-item>
              </el-col>
              <el-col :span="22" class="login-tip-error">
                <el-form-item class="bgwhite" prop="username">
                  <el-input
                    v-model="loginForm.username"
                    icon="el-icon-search"
                    type="text"
                    auto-complete="off"
                    placeholder="账号"
                    @keyup.enter.native="login('loginForm')"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top: 25px;">
              <el-col :span="2">
                <el-form-item class="bgwhite">
                  <i class="el-icon-unlock"></i>
                </el-form-item>
              </el-col>
              <el-col :span="22" class="bgwhite">
                <el-form-item prop="password">
                  <el-input
                    v-model="loginForm.password"
                    type="password"
                    auto-complete="off"
                    placeholder="密码"
                    @keyup.enter.native="login('loginForm')"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
          <!--
          <el-form-item class="login-form-item" style="margin-bottom:8px;background:#ffffff">
            <el-col :span="2">
              <el-form-item class="bgwhite">
                <i class="el-icon-warning-outline"></i>
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item class="bgwhite">
                <el-input v-model="loginForm.captcha" type="test" auto-complete="off" placeholder="验证码" style="width: 100%;"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">&nbsp;</el-col>
            <el-col :span="6">
              <el-form-item class="login-verify">
                <img src="../../assets/login/verificat.png" />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <div class="login-operation">
              <a href="javascript:void(0);">忘记密码</a>
              <a href="javascript:void(0);">
                <span>看不清，换一张</span>
              </a>
            </div>
          </el-form-item>
          -->
          <el-form-item class="login-btn" style="margin-top: 30px;">
            <el-button type="primary" v-waves @click="login('loginForm')" :loading="loading">登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      loading: false,
      tabCon: false,
      loginForm: {
        username: "",
        password: "",
        captcha: "",
        src: ""
      },
      fieldRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
        // ,
        // captcha: [
        //   { required: true, message: '请输入验证码', trigger: 'blur' }
        // ]
      }
    };
  },
  methods: {
    login(loginForm) {
      this.loading = true;

      let userInfo = {
        username: this.loginForm.username,
        password: this.loginForm.password
      };

      this.$refs[loginForm].validate(valid => {
        this.loading = false;
        if (valid) {
          this.$api.login
            .login(userInfo)
            .then(res => {
              if (res.success == false) {
                this.$message({
                  message: res.message,
                  type: "error"
                });
              } else {
                Cookies.set("token", res.data.token); // 放置token到Cookie
                localStorage.setItem("user", userInfo.username); // 保存用户到本地会话
                this.$store.commit("menuRouteLoaded", false); // 要求重新加载导航菜单
                this.$router.push("/"); // 登录成功，跳转到主页
              }
            })
            .catch(res => {
              this.$message({
                message: res.message,
                type: "error"
              });
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.login-body-bg {
  background: url(../../assets/login/background01.png) no-repeat center center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  height: 100%;
  background-size: cover;
  -webkit-background-size: cover;

  .login-card {
    position: absolute;
    top: 16%;
    right: 15%;

    .login-card-bg {
      background: rgba($color: #ffffff, $alpha: 0.8);
      width: 320px;
      height: 400px;
      padding: 22px 27px;
      position: relative;

      .login-form {
        margin-top: 50px;
      }

      .login-tab-icon {
        position: absolute;
        right: 7px;
        top: 7px;
      }

      .login-logo {
        text-align: left;

        img {
          width: 162px;
          margin-bottom: 10px;
        }

        h2 {
          font-size: 32px;
          color: #182c40;
          font-weight: bold;
          margin: 0;
        }
      }

      .el-input__inner {
        background: #ffffff !important;
        border: none;
      }

      .login-operation {
        display: flex;
        justify-content: space-between;

        a {
          color: #1e9fff;
          font-size: 12px;
          height: 20px;
          line-height: 20px;
          text-decoration: none;
        }
      }

      .login-btn {
        width: 100%;

        button {
          width: 100%;
        }
      }

      .login-form-item {
        box-shadow: 0px 0px 18px 2px #e7f3fb;

        .el-form-item__content {
          text-align: center;

          .login-verify {
            height: 40px;

            img {
              width: 100%;
              height: 40px;
            }
          }
        }
      }
    }

    .el-form-item .bgwhite {
      background: #ffffff;
    }

    .login-slog {
      width: 190px;
      margin: 38px auto 0px;
      color: #999999;
      font-size: 14px;
    }
  }
}
</style>
