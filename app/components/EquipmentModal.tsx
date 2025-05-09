"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"

interface Equipment {
  kategori: string
  type: string
  modell: string
  bilde?: any
  description?: string
  dailyRate?: number
  available?: boolean
}

interface AddEquipmentModalProps {
  onClose: () => void
  onAdd: (equipment: Equipment) => void
  categories: string[]
}

export default function AddEquipmentModal({ onClose, onAdd, categories }: AddEquipmentModalProps) {
  const [formData, setFormData] = useState<Equipment>({
    kategori: categories[0] || "",
    type: "",
    modell: "",
    description: "",
    dailyRate: 0,
    available: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: Number.parseFloat(value) }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onAdd(formData)
    } catch (error) {
      console.error("Error adding equipment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-lg max-w-md w-full border border-border">
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h3 className="font-medium">Add New Equipment</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="kategori" className="block text-sm font-medium text-foreground mb-1">
                Category
              </label>
              <select
                id="kategori"
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
                className="w-full bg-background border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
                <option value="New Category">New Category</option>
              </select>
            </div>

            {formData.kategori === "New Category" && (
              <div>
                <label htmlFor="newCategory" className="block text-sm font-medium text-foreground mb-1">
                  New Category Name
                </label>
                <input
                  type="text"
                  id="newCategory"
                  name="kategori"
                  value={formData.kategori === "New Category" ? "" : formData.kategori}
                  onChange={handleChange}
                  className="w-full bg-background border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            )}

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-foreground mb-1">
                Type
              </label>
              <input
                type="text"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-background border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label htmlFor="modell" className="block text-sm font-medium text-foreground mb-1">
                Model
              </label>
              <input
                type="text"
                id="modell"
                name="modell"
                value={formData.modell}
                onChange={handleChange}
                className="w-full bg-background border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full bg-background border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="dailyRate" className="block text-sm font-medium text-foreground mb-1">
                Daily Rate ($)
              </label>
              <input
                type="number"
                id="dailyRate"
                name="dailyRate"
                value={formData.dailyRate}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full bg-background border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="available"
                name="available"
                checked={formData.available}
                onChange={handleChange}
                className="h-4 w-4 text-primary focus:ring-primary border-input rounded"
              />
              <label htmlFor="available" className="ml-2 block text-sm text-foreground">
                Available for rent
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-input rounded-md text-sm font-medium hover:bg-accent"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Equipment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
