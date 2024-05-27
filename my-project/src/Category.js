import React, { useState, useEffect } from 'react';
import { Table, Button} from 'semantic-ui-react';
import axios from 'axios';
import LoadingCom from './LoadingCom';

function Category() {
    const [data, setData] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('https://script.google.com/macros/s/AKfycbzzHlr-1FsMj0kZSda45pZlNWHHVg5apV9L6lvQKhvVsAMfj1i5NAugOxGXK72rc_c5/exec')
            .then(res => {
                setData(res.data);
                setIsLoading(false); // Set loading to false after data is fetched
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false); // Set loading to false even if there's an error
            });
    }, []);

    // Total Subject in Category
    const calculateTotalSubject = () => {
        const totalsSubject = {};
        data.forEach(test => {
            if (selectedCategories.length === 0 || selectedCategories.includes(test.category_Name)) {
                if (!totalsSubject[test.category_Name]) {
                    totalsSubject[test.category_Name] = 0;
                }
                totalsSubject[test.category_Name]++;
            }
        });
        return totalsSubject;
    };
    const totalsSubject = calculateTotalSubject();

    //Page Category
    const totalPages = Math.ceil(Object.keys(totalsSubject).length / itemsPerPage);
    const currentCategories = Object.entries(totalsSubject)
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            {isLoading ? (
                <LoadingCom /> // Display loading component
            ) : (
                <>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Category</Table.HeaderCell>
                                <Table.HeaderCell>TotalSubject</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {currentCategories.map(([category, total]) => (
                                <Table.Row key={category}>
                                    <Table.Cell component="th" scope="row" align="center">
                                        {category}
                                    </Table.Cell>
                                    <Table.Cell align="center">{total} วิชา</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>

                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
}

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center mt-4">
            {pageNumbers.map(number => (
                <Button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`mx-1 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                >
                    {number}
                </Button>
            ))}
        </div>
    );
};

export default Category;
