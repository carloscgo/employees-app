/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useMemo, useState } from "react"
import { Table, Row, Col, Card, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import Context from '../../utils/context';
import { TITLE_PAGES } from '../../utils/constants';
import routes from '../../utils/routes';
import {
  PropsEmployee, Paginate, IFunc
} from '../../utils/interfaces';

import Dialog from '../Dialog'

import { ROWS, Props, messages } from './contants'
import Container from './styles'

const List = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [toDelete, setToDelete] = useState<null | number>(null);

  const { employees, paginate, onLoad, onDelete } = useContext(Context) as {
    employees: Array<PropsEmployee>,
    paginate: Paginate,
    onLoad: IFunc,
    onDelete: IFunc
  };

  const canLoad = useMemo(() => (paginate.limit + paginate.skip) < paginate.total, [paginate])

  const getValue = (item: any, prop: any) => item[prop]

  const routeDetails = routes.find((route) => route.slug === 'employee')

  const mapId = (id: number) => routeDetails?.path.replace(':id', id.toString())

  const propsDialog = {
    open: showDialog,
    ...messages.dialog,
    onAction: () => {
      onDelete(toDelete)
      setShowDialog(false)
    },
    onClose: () => setShowDialog(false)
  }

  const onDeleteHandler = (id: number) => {
    setToDelete(id)
    setShowDialog(true)
  }

  return (
    <Container fluid>
      <Dialog {...propsDialog} />

      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">{TITLE_PAGES.employees}</Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    {ROWS.map((row) => (
                      <th key={row.prop} className="border-0">{row.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {employees.map((item: PropsEmployee) => (
                    <tr key={item.id}>
                      {ROWS.map((row: Props) => (
                        <td key={`${row.prop}-${item.id}`}>
                          {row.prop === 'image' ? <Image className="avatar" roundedCircle thumbnail src={getValue(item, row.prop)} /> : getValue(item, row.prop)}
                          {row.prop === 'actions' && (
                            <div className="actions">
                              <Link to={mapId(item.id) as string}>
                                <i className="bu bi-pencil-square text-primary"></i>
                              </Link>

                              <Button className="btn-delete" variant="link" onClick={() => onDeleteHandler(item.id)}>
                                <i className="bu bi-trash-fill text-danger"></i>
                              </Button>
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>

              {canLoad && (
                <div className="d-flex align-items-center justify-content-center m-5">
                  <Button onClick={() => onLoad()}>
                    Load More
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default List;
