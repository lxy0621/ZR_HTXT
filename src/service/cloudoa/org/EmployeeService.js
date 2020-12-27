import * as employee from "@/net/http/modules/employee";
import * as role from "@/net/http/modules/role";

/**
 * 员工
 */
export class EmployeeService {
	constructor() {}
	/**
	 * 分页查询
	 */
	pagingEmployees(data) {
		return new Promise((resolve, reject) => {
			try {
				employee.pagingEmployees(data).then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		});
	}

  /**
   * 据部门ID分页查询员工
   */
  pagingEmployeesByDepartmentId(data) {
    return new Promise((resolve, reject) => {
      try {
        employee.pagingEmployeesByDepartmentId(data).then(function(res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

	/**
	 * 保存员工
	 */
	createEmployee(data) {
	  if (data.accountOpenState) {
	    data.accountOpenState = 1;
    } else {
	    data.accountOpenState = 0;
    }
		return new Promise((resolve, reject) => {
			try {
				employee.createEmployee(data).then(function(res) {
					resolve(res);
				});
			} catch (error) {
				reject(error);
			}
		});
	}
	/**
	 * 修改员工
	 */
	updateEmployee(data) {
    if (data.accountOpenState) {
      data.accountOpenState = 1;
    } else {
      data.accountOpenState = 0;
    }
		return new Promise((resolve, reject) => {
			try {
				employee.updateEmployee(data).then(function(res) {
					resolve(res);
				});
			} catch (error) {
				reject(error);
			}
		});
	}
	/**
	 * 删除员工
	 */
	deleteEmployees(data) {
		return new Promise((resolve, reject) => {
			try {
				employee.deleteEmployees(data).then(function(res) {
					resolve(res);
				});
			} catch (error) {
				reject(error);
			}
		});
	}
  /**
   * 重置密码
   */
  resetPassword(data) {
    return new Promise((resolve, reject) => {
      try {
        employee.resetPassword(data).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
	/**
	 * 开通账户
	 */
	openEmployeeAccount(data) {
		return new Promise((resolve, reject) => {
			try {
				employee.openEmployeeAccount(data).then(function(res) {
					resolve(res);
				});
			} catch (error) {
				reject(error);
			}
		});
	}
	/**
	 * 查询员工
	 */
	getEmployeeById(data) {
		return new Promise((resolve, reject) => {
			try {
				employee.getEmployeeById(data).then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		});
	}
	/**
	 * 部门树
	 */
	departmentTree(data) {
		return new Promise((resolve, reject) => {
			try {
				employee.departmentTree(data).then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		});
	}
	/**
	 * 所有角色
	 */
	roleList() {
		return new Promise((resolve, reject) => {
			try {
				role.findRoles().then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		});
	}
}
