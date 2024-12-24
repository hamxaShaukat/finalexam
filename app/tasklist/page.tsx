import TableComponent from '@/components/Table'
import TaskList from '@/components/TaskList'
import React from 'react'

const TaskListPage = () => {
  return (
    <div>
        <TaskList />
        <TableComponent/>
    </div>
  )
}

export default TaskListPage