import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const userGrowthData = [
  { month: "Jan", users: 100 },
  { month: "Feb", users: 200 },
  { month: "Mar", users: 300 },
  { month: "Apr", users: 500 },
  { month: "May", users: 800 },
  { month: "Jun", users: 1200 }
];

const songPlaysData = [
  { genre: "Pop", plays: 4000 },
  { genre: "Rock", plays: 3000 },
  { genre: "Hip-Hop", plays: 2000 },
  { genre: "Jazz", plays: 1500 },
  { genre: "Classical", plays: 1000 }
];

const cards = [
  { title: "Total Users", value: "1,200" },
  { title: "Total Songs", value: "5,432" },
  { title: "Total Artists", value: "320" },
  { title: "Total Albums", value: "150" }
];

const recentlyAdded = ["Song A", "Song B", "Song C", "Song D", "Song E"];
const mostPlayed = ["Hit 1", "Hit 2", "Hit 3", "Hit 4", "Hit 5"];

const MusicDashboard = () => {
  return (
    <DashboardWrapper headerTitle="Dashboard">
      <Box p={3}>
        {/* Cards */}
        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  textAlign: "center",
                  p: 2,
                  bgcolor: "primary.main",
                  color: "white"
                }}
              >
                <CardContent>
                  <Typography variant="h6">{card.title}</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {card.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={3} my={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Monthly User Growth
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userGrowthData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Recently Added Songs
              </Typography>
              {recentlyAdded.map((song, index) => (
                <Typography key={index} variant="body1" sx={{ my: 1 }}>
                  {song}
                </Typography>
              ))}
            </Paper>
          </Grid>
        </Grid>

        {/* Songs List */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Most Played Genres
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={songPlaysData}>
                  <XAxis dataKey="genre" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="plays" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Most Played Songs
              </Typography>
              {mostPlayed.map((song, index) => (
                <Typography key={index} variant="body1" sx={{ my: 1 }}>
                  {song}
                </Typography>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </DashboardWrapper>
  );
};

export default MusicDashboard;
