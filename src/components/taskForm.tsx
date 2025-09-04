import { useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Select } from './ui/select'
import { Badge } from './ui/badge'
import type { Subtask, Task } from '@/types/tssk'
import { Plus, X } from 'lucide-react'
import { TextField } from './ui/text-field'
import { NumberField } from './ui/number-field'
import { DatePicker } from './ui/date-picker'
// import { useDateFormatter } from '@react-aria/i18n'
import { getLocalTimeZone, parseDate, today } from '@internationalized/date'


interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    dueDate: new Date().toISOString().split('T')[0],
    category: 'Other',
    tags: [] as string[],
    completed: false,
    estimatedTime: undefined as number | undefined,
    subtasks: [] as Subtask[]
  })

  const [tagInput, setTagInput] = useState('')
  const [subtaskInput, setSubtaskInput] = useState('')

  const now = today(getLocalTimeZone())
  const [dateValue, setDateValue] = useState(parseDate(now.toString()))
//   const formatter = useDateFormatter({ dateStyle: "full" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    onSubmit(formData)
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
      category: 'Other',
      tags: [],
      completed: false,
      estimatedTime: undefined,
      subtasks: []
    })
    setTagInput('')
    setSubtaskInput('')
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      })
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    })
  }

  const addSubtask = () => {
    if (subtaskInput.trim()) {
      const subtask: Subtask = {
        id: Date.now().toString(),
        title: subtaskInput.trim(),
        completed: false
      }
      setFormData({
        ...formData,
        subtasks: [...formData.subtasks, subtask]
      })
      setSubtaskInput('')
    }
  }

  const removeSubtask = (subtaskId: string) => {
    setFormData({
      ...formData,
      subtasks: formData.subtasks.filter(st => st.id !== subtaskId)
    })
  }

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  const handleSubtaskInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSubtask()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-h-[70vh] overflow-y-auto">
      <div>
        <TextField
          label='Title'
          value={formData.title}
          onChange={(value) => setFormData({ ...formData, title: value })}
          placeholder="Enter task title"
        />
      </div>

      <div>
        <Textarea
          label='Description'
          value={formData.description}
          onChange={(value) => setFormData({ ...formData, description: value })}
          placeholder="Enter task description"  
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Select
            label='Priority'
            selectedKey={formData.priority}
            onSelectionChange={(value) => 
              setFormData({ ...formData, priority: value as 'low' | 'medium' | 'high' })
            }
          >
            <Select.Trigger/>
            <Select.List>
              <Select.Option textValue="low">Low</Select.Option>
              <Select.Option textValue="medium">Medium</Select.Option>
              <Select.Option textValue="high">High</Select.Option>
            </Select.List>
          </Select>
        </div>

        <div>
          <DatePicker
            label='Due Date'
            value={dateValue}
            onChange={(value) => setDateValue(value || now)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Select
            label='Category'
            selectedKey={formData.category}
            onSelectionChange={(value) => setFormData({ ...formData, category: value as string })}
          >
            <Select.Trigger/>
            <Select.List>
              <Select.Option textValue="Design">Design</Select.Option>
              <Select.Option textValue="Development">Development</Select.Option>
              <Select.Option textValue="Documentation">Documentation</Select.Option>
              <Select.Option textValue="Meeting">Meeting</Select.Option>
              <Select.Option textValue="Other">Other</Select.Option>
            </Select.List>
          </Select>
        </div>

        <div>
          <NumberField
            label='Estimated Time'
            value={formData.estimatedTime ?? 0}
            onChange={(value) => setFormData({ 
              ...formData, 
              estimatedTime: value ? Number(value) : undefined
            })}
            placeholder="e.g. 60"
          />
        </div>
      </div>

      <div>
        <div className="flex space-x-2 mb-2">
          <TextField
            label='Tag'
            value={tagInput}
            onChange={(value) => setTagInput(value)}
            onKeyDown={handleTagInputKeyPress}
            placeholder="Add a tag"
            className="flex-1"
          />
          <Button onClick={addTag} intent="outline" size="sm">
            Add
          </Button>
        </div>
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <Badge key={index} intent="secondary" className="text-xs">
                {tag}
                <Button
                  intent="secondary"
                  size="sm"
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex space-x-2 mb-2">
          <TextField
            label='Subtask'
            value={subtaskInput}
            onChange={(value) => setSubtaskInput(value)}
            onKeyDown={handleSubtaskInputKeyPress}
            placeholder="Add a subtask"
            className="flex-1"
          />
          <Button type="button" onClick={addSubtask} intent="outline" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {formData.subtasks.length > 0 && (
          <div className="space-y-2">
            {formData.subtasks.map((subtask) => (
              <div key={subtask.id} className="flex items-center space-x-2 p-2 border rounded">
                <span className="flex-1 text-sm">{subtask.title}</span>
                <Button
                  intent="secondary"
                  size="sm"
                  onClick={() => removeSubtask(subtask.id)}
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Create Task
        </Button>
      </div>
    </form>
  )
}