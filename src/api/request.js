import axios from 'axios'
// import Qs from "qs";

const prefix = '/api'

//查看登录状态
export async function getLoginStatus() {
  const url = prefix + '/teacher_login/'
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
  const url = prefix + '/teacher_login/'
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
  const url = prefix + '/teacher_logout/'
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
  const url = prefix + '/question/'
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
  const url = prefix + '/question/delete/'
  try {
    const res = await axios({
      method: 'post',
      url: url,
      data: question_ids
    });
    return await Promise.resolve(res.data);
  } catch (err) {
    return await Promise.reject(err);
  }
}

//查看学生留言
export async function getStudentMessage() {
  const url = prefix + '/student_message/'
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