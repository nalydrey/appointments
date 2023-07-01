
import {ChangeEvent} from 'react'
import { InputField } from './InputField'
import { FormElements } from '../data/formData'
import { FormModel } from '../Models/Models'

interface FormProps {
    obj: FormModel
    fields: FormElements[]
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Form = ({
    obj,
    fields,
    onChange
}: FormProps) => {

  return (
    <div className="flex flex-col gap-5 min-h-[200px]">
        {
            fields.map(field => {
                const key = field.name as keyof FormModel
                return  (
                    <InputField
                        key = {field.name}
                        id={field.name}
                        name ={field.name}
                        value={obj[key]}
                        type='text'
                        label={field.label}
                        placeholder={field.placeholder}
                        onChange={onChange}
                    />
                )
            })
            
        }
    </div>
  )
}
