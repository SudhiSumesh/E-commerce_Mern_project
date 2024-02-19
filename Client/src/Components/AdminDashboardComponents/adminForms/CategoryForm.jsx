import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react'

function CategoryForm({handleFormSubmit,value,setValue}) {
  return (
    <>
      <form
        className="flex max-w-md flex-col gap-4 mt-4"
        onSubmit={handleFormSubmit}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Add New Category" />
          </div>
          <TextInput type="text" value={value} placeholder=" category name" required onChange={(e)=>setValue(e.target.value)}/>
          <Button type="submit" color="blue" className="my-2 ">
            Add Category
          </Button>
        </div>
      </form>
    </>
  );
}

export default CategoryForm
