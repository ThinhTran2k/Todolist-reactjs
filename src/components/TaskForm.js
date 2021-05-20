import React from 'react';
class TaskForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false,
        };
    }

    // hàm đóng form
    onClose = () => {
        this.props.onClose()
    }

    // hàm gửi data cho cha khi submit
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear();
        this.onClose();
    }

    // hàm clear ô input
    onClear = () => {
        this.props.onClear();
    }

    // lifecycle set data taskEditing vào task để hiển thị data taskEditing lên form
    // hoạt động khi 1 sự kiện xảy ra lần đầu tiên (hay khi taskform đc gọi)
    // componentDidMount() {
    //     if (this.props.taskEditing){
    //         this.setState({
    //             id: this.props.taskEditing.id,
    //             name: this.props.taskEditing.name,
    //             status: this.props.taskEditing.status
    //         });
    //     }
    // }

    // lifecycle đc call ngay khi có sự thay đổi props sẽ return new state or null
    // static getDerivedStateFromProps(props, state) {
    //     // TH có taskEditing thì cập nhật form
    //     if (props.taskEditing) {
    //         if (props.taskEditing.id !== state.id) {
    //             return {
    //                 id: props.taskEditing.id,
    //                 name: props.taskEditing.name,
    //                 status: props.taskEditing.status
    //             };
    //         }
    //         // TH ko có taskEditing thì reset form (khi click thêm mà form đã đc gọi trc đó)
    //     } else if (!props.taskEditing) {
    //         return {
    //             id: '',
    //             name: '',
    //             status: false
    //         }
    //     }
    //     return null
    // }

    render() {
        const { id, name, status } = this.state;
        console.log(' this.state', this.state)
        return (
            <div className="panel panel-warning">
                <div className="panel-heading d-flex justify-content-between align-items-center">
                    <h3 className="panel-title">{id !== '' ? "Cập nhật công việc" : "Thêm Công Việc"}</h3>
                    <button className="btn" onClick={this.onClose}><i className="fas fa-times"></i></button>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={(e)=>{
                                    const currentText = e.target.value;
                                    this.setState({ name: currentText });
                                }}
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select
                            className="form-control"
                            required="required"
                            name="status"
                            value={status}
                            onChange={(e) => {
                                const currentSelected = e.target.value;
                                this.setState({ status: currentSelected });
                            }}
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default TaskForm;