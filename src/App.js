import React from 'react'
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import ListTable from './components/Table';
import { findIndex, filter} from 'lodash';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplay: false,
      taskEditing: null,
      filterNT: {
        name: '',
        status: -1
      },
      keyWord: '',
      sort: {
        by: 'name',
        value: -1
      }
    };
  }

  // 1 lifecircle giúp lưu data vào state khi có event load(F5)
  // lưu data vô tasks
  componentDidMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      let task = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: task
      });
    }
  }

  // tao ham random string 4 ky tu thuoc he 16
  // 0x10000 là số trong hệ 16
  // toString(16) convert về string với base 16
  // floor là làm tròn số nguyên && substring(1) là cắt chuỗi từ vtri 1
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  generateID() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4();
  }

  // hàm hiển thị form
  onDisplayForm = () => {
    if (this.state.isDisplay && this.state.taskEditing !== null) {
      this.setState({
        isDisplay: true,
        taskEditing: null
      });
    } else {
      this.setState({
        isDisplay: !this.state.isDisplay,
        taskEditing: null
      });
    }
  }

  // hàm mở form
  onOpenForm = () => {
    this.setState({
      isDisplay: true
    })
  }
  // hàm đóng form
  onCloseForm = () => {
    this.setState({
      isDisplay: false
    })
  }

  // hàm clear form
  onClear = () => {
    this.setState({
      id: '',
      name: '',
      status: false,
      taskEditing: null
    })
    this.onCloseForm();
  }

  // hàm lưu data khi click btn them
  onSubmit = (data) => {
    let { tasks } = this.state;
    if (data.id === '') {
      data.id = this.generateID();
      data.status = Boolean(data.status)
      tasks.push(data);
      // console.log(data);
      // console.log(tasks);
    } else {
      let index = findIndex(tasks, (task) => {
        return task.id === data.id;
      })
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taskEditing: null
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onFindIndex = (id) => {
    let { tasks } = this.state;
    let result = -1;
    tasks.forEach((element, idx) => {
      if (element.id === id) {
        result = idx;
      }
    });
    return result;
  }

  // hàm update trạng thái khi click
  onUpdateStatus = (id) => {
    let { tasks } = this.state;
    // let index = this.onFindIndex(id);
    let index = findIndex(tasks, (task) =>{
      return task.id === id;
    })
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      })
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  // hàm xóa khi click
  onDelete = (id) => {
    let { tasks } = this.state;
    let index = findIndex(tasks, (task) => {
      return task.id === id;
    })
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      })
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onCloseForm();
  }

  // hàm sửa data
  onUpdate = (id) => {
    let { tasks } = this.state;
    let index = findIndex(tasks, (task) => {
      return task.id === id;
    })
    if (index !== -1) {
      // biến lưu data đc click vào
      let TaskEditing = tasks[index];
      // lưu data vào state
      this.setState({
        taskEditing: TaskEditing
      }, () => {
        // vì setState là async
        console.log(this.state.taskEditing)
      })
    }
    this.onOpenForm();
  }

  // hàm 
  onFilter = (fltN, fltS) => {
    fltS = parseInt(fltS, 10)
    this.setState({
      filterNT: {
        name: fltN,
        status: fltS
      }
    });
  }

  // hàm tìm tiếm tự nghĩ
  onSearch = (data) => {
    // let itemS = [];
    // let rslt = {};
    // if (data) {
    //   rslt = this.state.tasks.filter((task) => {
    //     return task.name.toLowerCase().indexOf(data) !== -1;
    //   })
    //   // let rsltO = Object.assign({}, rslt);
    //   // console.log(rslt);
    //   // itemS.id = this.generateID();
    //   itemS.push(rslt);
    //   // console.log(itemS);
    // }
    // this.setState({
    //   strS: itemS,
    //   keyWord: data
    // })
    if(data){
      this.setState({
        keyWord : data
      })
    }
  }

  onSort = (data, data1) => {
    this.setState({
      sort: {
        by: data,
        value: data1
      }
    },() => {console.log(this.state.sort)})
  }


  render() {
    const { isDisplay, filterNT, tasks, keyWord } = this.state;

    let res = [ ...tasks]
    // filter theo ten 
    if (filterNT) {
      if (filterNT.name) {
        res = res.filter((task) => {
          return task.name.toLowerCase().indexOf(filterNT.name) !== -1;
        });
        console.log('status', filterNT)
        if(filterNT.status !== -1){
          res = res.filter((task) => {
              console.log('filterNT task', task)
            if (filterNT.status === 1 && task.status === true) {
              return true
            }
            else if (filterNT.status === 0 && task.status === false) {
              return true
            }
            return false
          });
          console.log('res sta', res)
        }
        
        console.log('task,', res)
      }
    }

    // sắp xếp theo name hoặc status
    if (this.state.sort.by === 'name') {
      res.sort((a, b) => {
        if (a.name > b.name) return 1;
        else if (a.name < b.name) return -1;
        else return 0;
      })
    } else {
      res.sort((a, b) => {
        if (a.status > b.status) return 1;
        else if (a.status < b.status) return -1;
        else return 0;
      })
    }

    // search use lib lodash
    res = filter(res, (task) =>{
      return task.name.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1;
    });

    const taskformEl = isDisplay ? <TaskForm onClear={this.onClear} onClose={this.onCloseForm} onSubmit={this.onSubmit} taskEditing={this.state.taskEditing} /> : '';
    return (
      <div className="container">
        <div className="text-center">
          <h1 >Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplay ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
            {/* Form */}
            {taskformEl}
          </div>
          <div className={isDisplay ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button type="button" className="btn btn-primary" onClick={this.onDisplayForm}>
              <span className="fa fa-plus mr-3"></span>Thêm Công Việc
            </button>
            {/* search and sort */}
            <Control 
              onSearch={this.onSearch} 
              onSort = {this.onSort}
              />
            {/* List Table */}
            <ListTable
              tasks={res}
              onUpdateStatus={this.onUpdateStatus}
              onDelete={this.onDelete}
              onUpdate={this.onUpdate}
              onFilter={this.onFilter}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
