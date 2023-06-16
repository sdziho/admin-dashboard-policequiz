import * as React from "react";
import { number, Title as TitleNovi, useGetList } from "react-admin";
import { FirebaseAuthProvider } from "react-admin-firebase";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@material-ui/core/Grid";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";
import { Line, Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    title: {
      display: true,
      text: "Broj registrovanih korisnika po mjesecima",
    },
  },
};

const options_age = {
  responsive: true,
  scales: {
    yAxes: [
      {
        ticks: {
          stepSize: 1,
        },
      },
    ],
  },
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    title: {
      display: true,
      text: "Broj korisnika po dobnoj grupi",
    },
  },
};

const labels = [
  "Januar",
  "Februar",
  "Mart",
  "April",
  "Maj",
  "Juni",
  "Juli",
  "August",
  "Septembar",
  "Oktobar",
  "Novembar",
  "Decembar",
];

const labels_age = [
  "<16",
  "16 - 18",
  "19 - 24",
  "25 - 30",
  "31 - 40",
  "41 - 50",
  "60+",
];

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const authProvider = FirebaseAuthProvider(firebaseConfig, {});

const user = authProvider.checkAuth();
let user_mail = "";
user.then((user) => {
  user_mail = user.email;
});

export const Dashboard = () => {
  const { data, total, isLoading, error } = useGetList("users", {
    sort: { field: "createdAt", order: "DESC" },
    pagination: { page: 1, perPage: 3000 },
  });
  let usersPerMonth = [];
  if (!isLoading) {
    for (let i = 1; i <= 12; i++) {
      let sum = 0;
      data.map((user) => {
        let datum = new Date(user.createdAt);
        let mjesec = datum.getMonth();
        if (mjesec + 1 === i) {
          sum++;
        }
      });
      usersPerMonth.push(sum);
    }
  }
  let premiumUsers = 0;
  let regularUsers = 0;
  if (!isLoading) {
    data.map((user) => {
      if (user.isPremium) {
        premiumUsers++;
      } else {
        regularUsers++;
      }
    });
  }
  let total_premium = premiumUsers + regularUsers;
  let premium_percent = (premiumUsers / total_premium) * 100;
  let regular_percent = (regularUsers / total_premium) * 100;
  const data_premium = {
    labels: [
      `Premium (${premium_percent.toFixed(2)}%)`,
      `Regularni (${regular_percent.toFixed(2)}%)`,
    ],
    datasets: [
      {
        label: "Broj kupovina",
        data: [premiumUsers, regularUsers],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const data_registered = {
    labels,
    datasets: [
      {
        label: "Registrovani korisnici",
        data: usersPerMonth,
        borderColor: "#0076c2",
        backgroundColor: "#0076c2",
      },
    ],
  };

  let males = 0;
  let females = 0;
  if (!isLoading) {
    data.map((user) => {
      if (user.gender) {
        if (user.gender === "m") {
          males++;
        } else {
          females++;
        }
      }
    });
  }
  let total_sex = males + females;
  let males_percent = (males / total_sex) * 100;
  let femailes_percent = (females / total_sex) * 100;
  const data_sex = {
    labels: [
      `Žene (${femailes_percent.toFixed(2)}%)`,
      `Muškarci (${males_percent.toFixed(2)}%)`,
    ],
    datasets: [
      {
        label: "Zastupljenost spolova",
        data: [females, males],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // const labels_age = ["16-18", "19-24", "25-30", "31-40", "41-50", "60+"];

  const convertSecondsToDate = (seconds) => {
    let current_date = new Date();
    let date = new Date(seconds * 1000);
    let year = date.getFullYear();
    let current_year = current_date.getFullYear();
    return current_year - year;
  };

  const getAgesFromBirthdate = (birthdate) => {
    let current_date = new Date();
    let date = new Date(birthdate);
    let year = date.getFullYear();
    let current_year = current_date.getFullYear();
    return current_year - year;
  };

  const usersPerAge = [0, 0, 0, 0, 0, 0, 0];
  if (!isLoading) {
    data.map((user) => {
      if (user.birhtDate) {
        let ages = getAgesFromBirthdate(user.birhtDate);
        if (ages < 16) {
          usersPerAge[0]++;
        } else if (ages <= 18) {
          usersPerAge[1]++;
        } else if (ages <= 24) {
          usersPerAge[2]++;
        } else if (ages <= 30) {
          usersPerAge[3]++;
        } else if (ages <= 40) {
          usersPerAge[4]++;
        } else if (ages <= 50) {
          usersPerAge[5]++;
        } else {
          usersPerAge[6]++;
        }
      }
    });
  }
  const data_ages = {
    labels: labels_age,
    datasets: [
      {
        label: "Broj korisnika po dobnoj grupi",
        data: usersPerAge,
        borderColor: "#0076c2",
        backgroundColor: "#0076c2",
      },
    ],
  };

  const option_pie = {
    maintainAspectRatio: false,
    tooltip: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const meta = dataset._meta[Object.keys(dataset._meta)[0]];
          const total = meta.total;
          const currentValue = tooltipItem?.value;
          const percentage = parseFloat(
            ((currentValue / total) * 100).toFixed(1)
          );
          return currentValue + " (" + percentage + "%)";
        },
        title: (tooltipItem) => `${tooltipItem[0]?.label}`,
      },
    },
  };

  return (
    <Card>
      <TitleNovi title={`PoliceQuiz`} />
      <CardContent>
        <h1>Dobrodošli!</h1>
      </CardContent>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CardContent>
            {usersPerMonth && <Line options={options} data={data_registered} />}
          </CardContent>
        </Grid>
        <Grid item xs={6}>
          <CardContent>
            {usersPerMonth && <Bar options={options_age} data={data_ages} />}
          </CardContent>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CardContent>
            {usersPerMonth && (
              <Pie
                width={350}
                height={350}
                options={option_pie}
                data={data_premium}
              />
            )}
          </CardContent>
        </Grid>
        <Grid item xs={6}>
          <CardContent>
            {usersPerMonth && (
              <Pie
                width={350}
                height={350}
                options={option_pie}
                data={data_sex}
              />
            )}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};
