import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import NavigationBar from "../NavigationBar/NavigationBar";
import './Dashboard.css';

function Dashboard(props) {
    const tables = [ ['Subscribers', 'subscribers'], ['History', 'history'], ['Scheduled', 'scheduled'], ['Templates', 'templates']]
    // const history = useHistory();

    // useEffect(() => {
    //     const user = localStorage.getItem('user');
    //     if(!user) history.push('/login');
    // });

    return (
        <div className='outer-wrapper'>
            <NavigationBar />
            <div className='content-wrapper'>
                <h3> User Data </h3>
                {tables.map((item, index) => {
                    return (
                        <div className='table-link' key={index}>
                            <Link to={{
                                pathname: `/user_tables/${item[1]}`,
                            }} > {item[0]}</Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Dashboard;