import axios from 'axios'
// import Qs from "qs";

const prefix = '/api'

//查看登录状态
export async function getLoginStatus() {
  const url = prefix + '/teacher/login/'
  try {
    const res = await axios({
      method: 'get',
      url: url
    });
    return await Promise.resolve(res.data);
  } catch (err) {
    return await Promise.reject(err);
  }
}

//用户登录
export async function login(form) {
  const url = prefix + '/teacher/login/'
  try {
    const res = await axios({
      method: 'post',
      url: url,
      data: form
    });
    return await Promise.resolve(res.data);
  } catch (err) {
    return await Promise.reject(err);
  }
}

//用户登出
export async function logout() {
  const url = prefix + '/logout/'
  try {
    const res = await axios({
      method: 'get',
      url: url
    });
    return await Promise.resolve(res.data);
  } catch (err) {
    return await Promise.reject(err);
  }
}

//增加测试题
export async function addQuestion(form) {
  const url = prefix + '/teacher/question/'
  try {
    const res = await axios({
      method: 'post',
      url: url,
      data: form
    });
    return await Promise.resolve(res.data);
  } catch (err) {
    return await Promise.reject(err);
  }
}

//删除测试题
export async function deleteQuestion(question_ids) {
  const url = prefix + '/teacher/question/'
  try {
    const res = await axios({
      method: 'delete',
      url: url,
      data: question_ids
    });
    return await Promise.resolve(res.data);
  } catch (err) {
    return await Promise.reject(err);
  }
}

//查看所有测试题
export async function getQuestion() {
  const url = prefix + '/teacher/question/'
  try {
    const res = await axios({
      method: 'get',
      url: url
    });
    return await Promise.resolve(res.data);
  } catch (err) {
    return await Promise.reject(err);
  }
}

//查看学生留言
export async function getStudentMessage() {
  const url = prefix + '/teacher/message/'
  try {
    const res = await axios({
      method: 'get',
      url: url
    });
    return await Promise.resolve(res.data);
  } catch (err) {
    return await Promise.reject(err);
  }
}

//回复学生留言
export async function ReplyStudentMessage(form) {
  const url = prefix + '/reply/'
  try {
    const res = await axios({
      method: 'post',
      url: url,
      data: form
    });
    return await Promise.resolve(res.data);
  } catch (err) {
    return await Promise.reject(err);
  }
}

//查看预约列表
export async function getReserve() {
  const url = prefix + '/teacher/reserve/'
  try {
    const res = await axios({
      method: 'get',
      url: url
    });
    return await Promise.resolve(res.data);
  } catch (err) {
    return await Promise.reject(err);
  }
}

//接收或拒绝预约
export async function ReplyReserve(form) {
  const url = prefix + '/teacher/reserve/'
  try {
    const res = await axios({
      method: 'post',
      url: url,
      data: form
    });
    return await Promise.resolve(res.data);
  } catch (err) {
    return await Promise.reject(err);
  }
}