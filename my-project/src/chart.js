import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Chart = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://script.google.com/macros/s/AKfycbx1KcGPCfD4AOUnyW45Ihf7knL6bL-2PZ1xIeo4ig12mmHT_7DnQNb8Epy4kAaCNu-E/exec?type=enrolLastDate'); 
                const fetchedData = response.data;

                const transformedData = fetchedData.map(item => ({
                    name: item.call_User,
                    value: item.user_enrole,
                    value2: item.user_awarded
                }));

                setChartData(transformedData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#1e3a8a" name="จำนวนการลงทะเบียนเรียน" />
                <Bar dataKey="value2" fill="#2563eb" name="จำนวนการรับรอง Certificate" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Chart;
