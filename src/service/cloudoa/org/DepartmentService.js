import * as dept from "@/net/http/modules/department";

/**
 * 部门
 */
export class DepartmentService {
  constructor() {
  }

  /**
   * 部门树查询
   */
  deptTree(queryParams){
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        dept.deptTree(queryParams).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 部门条件查询
   */
  dataList(queryParams){
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        dept.dataList(queryParams).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 枚举列表
   */
  enumList(params){
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        dept.enumList(params).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 員工列表 -- 下拉选择
   */
  employeesList (params){
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        dept.employeesList(params).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 删除
   */
  delOne(id){
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        dept.delOne(id).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 起用
   */
  enableDepartment(id){
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        dept.enableDepartment(id).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }
  /**
   * 停用
   */
  disableDepartment(id){
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        dept.disableDepartment(id).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 部门保存
   */
  saveDept(data){
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        dept.save(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 部门修改
   */
  updDept(data,id){
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        dept.update(data,id).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 油站保存
   */
  saveStation(data){
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        dept.saveStation(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 油站修改
   */
  updStation(data,id){
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        dept.updateStation(data,id).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 分页查询
   */
  /* pageRole() {
    return new Promise((resolve, reject) => {
      let result = '';

      try {
        role.findPage().then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  } */
}
