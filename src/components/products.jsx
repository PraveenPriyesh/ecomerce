import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './products.css';

function BasicExample() {
    const [product, setProduct] = useState([]);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [add,setAdd]=useState(false);
    const products = async () => {
        try {
            const res = await axios.get('https://fakestoreapi.com/products');
            console.log('res', res);
            setProduct(res.data);
        } catch (e) {
            console.log(e);
        }
    };
    const cart=(item)=>{
        console.log(item.title);
        
    }
    useEffect(() => {
        products();
    }, []);

    const handleCardClick = (title) => {
        setSelectedTitle(title);
    };

    return (
        <Container>
            <Row className="justify-content-center mt-4">
                {product.map((item) => (
                    <Col xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center mb-4" key={item.id}>
                        <Card
                            className="card"
                            onClick={() => handleCardClick(item.title)}
                        >
                            <Card.Img variant="top" src={item.image} className="card-img" />
                            <Card.Body className="card-body">
                                <Card.Title className="card-title">{item.title}</Card.Title>
                                <Card.Text className="card-text">
                                    <h5>Category: {item.category}</h5>
                                    <h5>Price : ${item.price}</h5>
                                </Card.Text>
                                <Button onClick={()=>cart(item)} variant="primary" className="card-button">Add to Cart</Button>
                            </Card.Body>
                            {/* Conditional rendering for the title popup */}
                            {selectedTitle === item.title && (
                                <div className="title-popup">
                                    {item.title}
                                </div>
                            )}
                        </Card>
                    </Col>
                    
                    
                ))}
                
            </Row>
        </Container>
    );
}

export default BasicExample;
