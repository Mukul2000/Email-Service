import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from 'axios';
import { getAuthHeader } from "../utils/authutils";
import {Table, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function TableDetail(props) {
    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([])
    const { table_name } = useParams();
    const page_size = 10;
    const [page, setPage] = useState(1);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/user_tables/${table_name}`, {
            headers: getAuthHeader(),
            params: {
                page_size: page_size,
                page: page
            }
        })
            .then(res => {
                console.log(res.data.result);
                setData(res.data.result.data);
                setHeaders(res.data.result.table_headers)


            })
            .catch(e => {
                console.log(e);
                setData([]);
                setHeaders([])
            });
    }, [page]);

    return (
        <div className='container'>
            <h2> Now viewing {table_name}</h2>
            <div className='table'>
            <Table striped bordered hover>
                <thead>
                <tr>
                {headers.map((item,ind) => {
                    return <th key={ind}> {item} </th>
                })}
                </tr>
                </thead>
                <tbody>
                    {data.map(t => (
                        <tr key={t._id}>
                        {
                            headers.map(property => {
                                if((table_name === 'templates' && property=== 'name') || (table_name === 'history' && property === 'sent_at')) return <Link to={{
                                    pathname: '/detail',
                                    state: {
                                        subject: t['email']['subject'],
                                        body: t['email']['body']
                                    }
                                }} key={property}> <td> {t[property]} </td> </Link>
                                else return  <td key={property}> {t[property]} </td> 
                            })
                        }
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
            {
            data.length > 0 &&
            <div className='paginator'>

                        {data.length == page_size && <Button className='page-counter' onClick={() => setPage(prev => prev + 1)}> + </Button> }
                        <h5 className='page-counter'>{page}</h5>
                        <Button className onClick={() => setPage(prev => Math.max(1,prev - 1))}> - </Button>
            </div>
            }
            {data.length === 0 && <div>No data found</div>}
        </div>
    );
}
export default TableDetail;