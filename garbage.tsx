<Dialog >
<DialogTrigger asChild>
<Button variant="ghost">
                    <Eye className="mr-2 h-4 w-4" /> View
                  </Button>
      </DialogTrigger>
<DialogContent className="sm:max-w-[425px]">
  <DialogHeader>
    <DialogTitle>{editedTask.title}</DialogTitle>
  </DialogHeader>
  <div className="grid gap-4 py-4">
    <div className="grid grid-cols-4 items-center gap-4">
      <label htmlFor="title" className="text-right">
        Title
      </label>
      <Input
        id="title"
        name="title"
        value={editedTask.title}
        onChange={handleChange}
        className="col-span-3"
      />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <label htmlFor="expiryDate" className="text-right">
        Expiry Date
      </label>
      <Input
        id="expiryDate"
        name="expiryDate"
        type="date"
        value={editedTask.expiryDate}
        onChange={handleChange}
        className="col-span-3"
      />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <label htmlFor="status" className="text-right">
        Status
      </label>
      <Select
        onValueChange={(value) => handleSelectChange('status', value)}
        value={editedTask.status}
      >
        <SelectTrigger className="col-span-3">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="done">Done</SelectItem>
          <SelectItem value="expired">Expired</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <label htmlFor="priority" className="text-right">
        Priority
      </label>
      <Select
        onValueChange={(value) => handleSelectChange('priority', value)}
        value={editedTask.priority}
      >
        <SelectTrigger className="col-span-3">
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <label htmlFor="content" className="text-right">
        Content
      </label>
      <Textarea
        id="content"
        name="content"
        value={editedTask.content}
        onChange={handleChange}
        className="col-span-3"
        rows={4}
      />
    </div>
  </div>
  <DialogFooter>
    <Button variant="destructive" onClick={() => onDelete(task.id)}>
      Delete
    </Button>
    <Button onClick={handleSave}>Save changes</Button>
  </DialogFooter>
</DialogContent>
</Dialog>