import React from 'react';
class TaskItem extends React.Component {
    // hàm truyền props cho cha khi click
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id);
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.task.id);
    }

    render() {
        let { task, title, index } = this.props
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{title}</td>
                <td className="text-center">
                    <span
                        className={task.status === true ? 'label bg-success' : 'label bg-danger'}
                        style={{ padding: '5px' }}
                        onClick={this.onUpdateStatus}
                    >
                        {task.status === true ? 'Active' : 'Hide'}
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={this.onUpdate}>
                        <span className="fa fa-pencil mr-3"></span>Sửa
                </button>
                                    &nbsp;
                <button type="button" className="btn btn-danger" onClick={this.onDelete}>
                        <span className="fa fa-trash mr-3"></span>Xóa
                </button>
                </td>
            </tr>
        )
    }
}

export default TaskItem;