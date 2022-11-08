import React from 'react';
import PropTypes  from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
//modals
import { Task } from '../../../models/task.class';
import { LEVELS } from '../../../models/levels.enum'; 




const TaskFormik = ({add, length}) => {
    let task = new Task();

    

    const initialValues = {
        name : '',
        description : '',
        completed : false,
        level : ''
    }
    function addTask(taskDate) {
       
        const newTask = new Task(
            taskDate.name,
            taskDate.description,
            taskDate.completed,
            taskDate.level
              
        );
        add(newTask);
    }
    const formSchema = yup.object().shape(
        {
            name: yup.string()
            .required('Name task is required'),
            description: yup.string()
            .min(15, 'Description too short')
            .required('Description is required'),
            completed: yup.boolean()
            .oneOf([false, true])
            .required('completed is required'),
            level: yup.string().oneOf([LEVELS.NORMAL, LEVELS.URGENT, LEVELS.BLOCKING], 'You moys select a levels')
            .required('Levels is required')
        }
    )
    const submit = (values) => {
        alert('Register task')
    }
   

    return (
        <div>
            <Formik
            initialValues={initialValues}
            validationSchema={formSchema}
            onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    addTask(values)
                  
            }}
            className='d-flex justify-content-center align-items-center mb-4'
            >
                {({ values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    }) =>(
                        <Form >
                        <div className='form-outline flex-fill'>
                        
                            <Field id="name"  type="text" name="name" placeholder="Your name task" className='form-control form-control-lg'/>
                            {/* Task errors  */}
                            {
                                errors.name && touched.name && 
                                (
                                    <ErrorMessage component='div' name='name' className='form-control' style={{backgroundColor: 'tomato', fontWeigth: 'bold' }} />
                                )
                            }                               
                            
                            
                            <Field id="description"  type="text"  name="description" placeholder="Your description task" className='form-control form-control-lg'/>
                            {/* Task errors  */}
                            {
                                errors.description && touched.description && 
                                (
                                    <ErrorMessage component='div' className='form-control' name='description' style={{backgroundColor: 'tomato', fontWeigth: 'bold' }}/>
                                )
                            }                               
                            
                            
                            <Field
                                
                                component="select"
                                id="level"
                                name="level"
                                className='form-control form-control-lg'
                                
                            >   
                                <option>Select level task</option>
                                <option value={LEVELS.NORMAL}>Task Normal</option>
                                <option value={LEVELS.URGENT}>Task Urgent</option>
                                <option value={LEVELS.BLOCKING}>Task Blocking</option>
                            </Field>
                                {
                                    errors.level && touched.level && 
                                    (
                                        <ErrorMessage className='form-control' component='div' name='level' style={{backgroundColor: 'tomato', fontWeigth: 'bold' }}/>
                                    )
                                }
                            
                            
                            <button type='submit' className='btn btn-success btn-lg ms-1'>
                            {length > 0 ? 'Add new task' : 'Create your first task' }
                            </button>
                            {isSubmitting ? (<p>Upload task...</p>): null}
                        </div>
                        </Form>
                    )}

            </Formik>
        </div>
    )
}
TaskFormik.protoTypes = {
    add: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired
}

export default TaskFormik;
