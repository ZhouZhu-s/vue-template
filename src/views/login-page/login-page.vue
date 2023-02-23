<template>
  <div class="login">
    <div class="illustration"></div>
    <div class="main">
      <a-card style="width: 100%" hoverable>
        <template #title>登录</template>
        <a-form>
          <a-form-item v-bind="validateInfos.username">
            <a-input
              v-model:value="loginForm.username"
              size="large"
              placeholder="请输入账号"
              allowClear
            >
              <template #prefix>
                <user-outlined style="color: #ccc" type="user" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item v-bind="validateInfos.password">
            <a-input-password
              size="large"
              v-model:value="loginForm.password"
              placeholder="请输入密码"
              allowClear
            >
              <template #prefix>
                <lock-outlined style="color: #ccc" />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item v-bind="validateInfos.verificationCode">
            <div class="verification-code">
              <a-input
                class="input"
                size="large"
                v-model:value="loginForm.verificationCode"
                placeholder="请输入验证码"
                allowClear
              />
              <verification-code
                :width="100"
                :height="40.14"
                @code="onVerificationCode"
              ></verification-code>
            </div>
          </a-form-item>
        </a-form>
        <a-button
          class="login-but"
          type="primary"
          size="large"
          block
          :loading="loading"
          @click="login()"
        >
          登录
        </a-button>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { UserOutlined } from '@ant-design/icons-vue';
import VerificationCode from './components/verification-code.vue';
import { message, Form } from 'ant-design-vue';
import { LoginForm } from './types';
import { postLoginApi } from '@/api/login';

const useForm = Form.useForm;
const loading = ref(false);
const loginForm = reactive<LoginForm>({
  username: '',
  password: '',
  verificationCode: '',
});
const rulesRef = reactive({
  username: [
    {
      required: true,
      message: '请输入账号',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
    },
  ],
  verificationCode: [
    {
      required: true,
      message: '请输入验证码',
    },
  ],
});
const { validate, validateInfos } = useForm(loginForm, rulesRef);

let _verificationCode = '';
const onVerificationCode = (code: string) => {
  _verificationCode = code;
};
const checkVerificationCode = () => {
  if (
    _verificationCode.toUpperCase() === loginForm.verificationCode.toUpperCase()
  ) {
    return true;
  } else {
    message.warning('验证码错误');
    return false;
  }
};

const login = () => {
  validate().then(async () => {
    if (!checkVerificationCode()) return;
    loading.value = true;
    console.log(loginForm);
    await postLoginApi({
      username: loginForm.username,
      password: loginForm.password,
    });
    loading.value = false;
  });
};
</script>

<style lang="less" scoped>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-image: url(/img/login_background.png);
  .illustration {
    width: 450px;
    height: 450px;
    margin-left: 5%;
    margin-top: 12%;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    background-image: url(/img/login_background_front.png);
  }
  .main {
    position: absolute;
    top: 30%;
    right: 15%;
    width: 400px;
    .verification-code {
      display: flex;
      justify-content: space-between;
      .input {
        width: 240px;
      }
    }
    .login-but {
      margin-top: 10px;
    }
  }
}
</style>
