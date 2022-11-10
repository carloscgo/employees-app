/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext, useRef, useEffect, memo } from "react";
import { Form as BForm, Button, FloatingLabel, Row, Col, Card, Image } from 'react-bootstrap';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message/dist';
import truncate from 'lodash/truncate';
import isEmpty from 'lodash/isEmpty';
import {
  useParams, useNavigate
} from "react-router-dom"

import Context from '../../utils/context';
import { TITLE_PAGES } from '../../utils/constants';

import {
  PropsEmployee,
  IFunc,
  ITypeForm,
} from '../../utils/interfaces';
import {
  searchRoute
} from '../../utils/services';

import Container from './styles';

const GENDERS = [{
  value: 'male',
  label: 'Male'
}, {
  value: 'female',
  label: 'Female'
}]

const GENDER_STYLES = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: "1px solid var(--bs-gray-300)",
    color: state.isSelected ? "white" : "blue",
    padding: 10,
    width: "100%"
  }),
  control: () => ({
    width: 300,
    display: "flex"
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  }
};

const FIELDS = ['id', 'firstName', 'lastName', 'age', 'gender', 'email', 'image']

const Form = ({ type }: ITypeForm) => {
  const [saved, setSaved] = useState(false)
  const [selectedGender, setSelectedGender] = useState({})
  const fileRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()
  const { id: EmpID } = useParams()

  const { employees, onSave } = useContext(Context) as {
    employees: Array<PropsEmployee>,
    onSave: IFunc,
  };

  const {
    register,
    errors,
    setValue,
    trigger,
    getValues,
    formState: { isValid }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }: any = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  })

  useEffect(() => {
    if (!isEmpty(EmpID) && type === 'edit' && !saved) {
      const single = employees.find((item: PropsEmployee) => item.id === Number(EmpID)) as any

      if (single) {
        setSelectedGender(GENDERS.find((item: any) => item.value === single.gender) as any)

        FIELDS.forEach((field) => setValue(field, single[field]))
      }
    }

    if (type === 'new') {
      FIELDS.forEach((field) => setValue(field, null))

      setSelectedGender({})
    }
  }, [EmpID])

  const error = (name: string) => errors && (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }: { message: string }) => (
        <BForm.Text id={`helpBlock-${name}`} muted>
          {message}
        </BForm.Text>
      )}
    />
  )

  const getPropRef = (ref: any, prop: any) => ref.current[prop]
  const setPropRef = (ref: any, prop: any, value: any) => { ref.current[prop] = value }

  const onSubmit = () => {
    if (!isValid) return

    const data = getValues()

    setSaved(true)

    onSave({
      type,
      data
    })
  }

  const triggerChange = () => {
    trigger()
    setSaved(false)
  }

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card>
            <Card.Header>
              <Card.Title as="h4">{TITLE_PAGES.single}</Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive p-4">
              <Row className="g-2">
                <Col md={6} sm={12} lg={6}>
                  <FloatingLabel label="Firstname" className="mb-3" controlId="formFirstname">
                    <BForm.Control type="text" name='firstName' maxLength={50} {...register('firstName', {
                      required: true
                    })}
                      onChange={() => triggerChange()}
                    />
                  </FloatingLabel>

                  {error('firstName')}
                </Col>
                <Col md={6} sm={12} lg={6}>
                  <FloatingLabel label="Lastname" className="mb-3" controlId="formLastname">
                    <BForm.Control type="text" name='lastName' maxLength={50} {...register('lastName', {
                      required: true
                    })}
                      onChange={() => triggerChange()}
                    />
                  </FloatingLabel>

                  {error('lastName')}
                </Col>
                <Col md={6} sm={12} lg={6}>
                  <FloatingLabel label="Age" className="mb-3" controlId="formAge">
                    <BForm.Control type="number" min="15" max="70" name='age' maxLength={50} {...register('age', {
                      required: true
                    })}
                      onChange={() => triggerChange()}
                    />
                  </FloatingLabel>

                  {error('age')}
                </Col>
                <Col md={6} sm={12} lg={6}>
                  <FloatingLabel label="Gender" className="mb-3" controlId="formGender">
                    <Select
                      defaultValue={selectedGender}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onChange={(e: any) => {
                        setSelectedGender(e)

                        setValue('gender', e.value)

                        triggerChange()
                      }}
                      name="gender"
                      className="form-control select"
                      options={GENDERS}
                      styles={GENDER_STYLES}
                      required={true}
                    />
                  </FloatingLabel>

                  {error('gender')}
                </Col>
                <Col md={6} sm={12} lg={6}>
                  <FloatingLabel label="Email" className="mb-3" controlId="formEmail">
                    <BForm.Control type="email" maxLength={50} {...register('email', {
                      required: true
                    })}
                      onChange={() => triggerChange()}
                    />
                  </FloatingLabel>

                  {error('email')}
                </Col>
                <Col md={6} sm={12} lg={6}>
                  <FloatingLabel label="Imagen" className="mb-3" controlId="formImage">
                    <BForm.Control as="div" type="text" ref={inputRef} onClick={() => fileRef?.current?.click()}>Choice a image</BForm.Control>

                    <BForm.Control className="d-none" ref={fileRef} type="file" name="image" accept="image/*"
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onChange={(e: any) => {
                        const image = e.target.files[0];
                        const reader = new FileReader();

                        setPropRef(inputRef, 'innerHTML', truncate(image.name, { length: 20 }))
                        setPropRef(inputRef, 'title', image.name)

                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        reader.onload = function (upload: any) {
                          setValue('image', upload.target.result)

                          triggerChange()
                        };
                        reader.readAsDataURL(image);
                      }}
                    />
                  </FloatingLabel>

                  {error('image')}
                </Col>
                <Col md={6} sm={12} lg={6}>
                  {getValues().image && <Image className="avatar" title={getPropRef(inputRef, 'title')} roundedCircle thumbnail src={getValues().image} />}
                </Col>
              </Row>

              <Row className="g-2 my-4">
                <Col className="d-flex justify-content-center buttons">
                  <Button variant="primary" type="button" onClick={() => navigate(searchRoute('home'))}>
                    <i className="bi bi-backspace-fill"></i> Cancel
                  </Button>

                  <Button variant="dark" type="submit" disabled={!isValid} onClick={() => onSubmit()}>
                    <i className="bi bi-save-fill"></i> Save
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
};

export default memo(Form);