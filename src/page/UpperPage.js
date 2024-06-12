import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardActions } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Typography, Button } from '@material-ui/core';
import '../App.css'; // App.css의 상대 경로를 수정합니다.

function UpperPage() {
  const [data, setData] = useState({ outcome: [] });

  const url = 'http://k8s-eksdemogroup-e0353f9ab7-808218605.ap-northeast-2.elb.amazonaws.com/services/all';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(url);
        console.log(result.data); // 데이터를 콘솔에 출력하여 확인합니다.
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="upper-page-root">
      <Grid container spacing={3}>
        {data.outcome.map(item => (
          <Grid item key={item.name} xs={12} sm={6} md={4} lg={3}>
            <Card className="upper-page-card">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body2" component="p">
                  <img
                    className="upper-page-media"
                    src={item.url}
                    alt={item.name}
                  />
                  <br />
                  {item.value}
                </Typography>
              </CardContent>
              <CardActions>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <Button size="small">See More</Button>
                </a>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default UpperPage;