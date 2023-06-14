import * as React from "react";
import { Admin, Resource, Title, Layout } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import { UserList } from "./pages/Users";
import {
  CategoriesList,
  CategoriesEdit,
  CategoriesCreate,
} from "./pages/Categories";
import {
  AdvertismentsList,
  AdvertismentsEdit,
  AdvertismentsCreate,
} from "./pages/Advertisments";
import {
  QuestionsList,
  QuestionsEdit,
  QuestionsCreate,
} from "./pages/Questions";
import {
  FirebaseDataProvider,
  FirebaseAuthProvider,
} from "react-admin-firebase";
import { Dashboard } from "./pages/Dashboard";
import CustomLoginPage from "./CustomLoginPage";

import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Quiz";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import { defaultTheme } from "react-admin";
import { createMuiTheme } from "@material-ui/core/styles";
import CroatianTranslate from "./croatian";
import CustomAppBar from "./CustomAppBar";

import "./App.css";

const CustomLayout = (props) => <Layout {...props} appBar={CustomAppBar} />;

const customTheme = createMuiTheme({
  ...defaultTheme,
  ...{
    palette: {
      primary: {
        main: "#030303",
      },
      secondary: {
        main: "#0076c2",
      },
    },
  },
});

const firebaseConfig = {
  apiKey: "AIzaSyDMB8N8Q2jZzqwhK7HCDDWKHDK9NB2lWhE",
  authDomain: "policequiz-v2.firebaseapp.com",
  projectId: "policequiz-v2",
  storageBucket: "policequiz-v2.appspot.com",
  messagingSenderId: "874175987764",
  appId: "1:874175987764:web:d081934160711523964a61",
  measurementId: "G-RF63XTTJJR",
};

const dataProvider = FirebaseDataProvider(firebaseConfig, {
  renameMetaFields: {
    created_at: "createdAt",
    created_by: "createdBy",
    updated_at: "updatedAt",
    updated_by: "updatedBy",
  },
});
const authProvider = FirebaseAuthProvider(firebaseConfig, {});

const i18nProvider = polyglotI18nProvider(() => CroatianTranslate, "en");

class App extends React.Component {
  render() {
    return (
      <Admin
        i18nProvider={i18nProvider}
        theme={customTheme}
        layout={CustomLayout}
        title="PoliceQuiz"
        loginPage={CustomLoginPage}
        dashboard={Dashboard}
        dataProvider={dataProvider}
        authProvider={authProvider}
      >
        <Title title="PoliceQuiz" />
        <Resource
          name="categories"
          options={{ label: "Kategorije" }}
          list={CategoriesList}
          edit={CategoriesEdit}
          create={CategoriesCreate}
          icon={CategoryIcon}
        />
        <Resource
          name="questions"
          options={{ label: "Pitanja" }}
          list={QuestionsList}
          edit={QuestionsEdit}
          create={QuestionsCreate}
          icon={InventoryIcon}
        />
        <Resource
          name="users"
          list={UserList}
          icon={GroupIcon}
          options={{ label: "Korisnici" }}
        />
        <Resource
          name="advertisments"
          list={AdvertismentsList}
          edit={AdvertismentsEdit}
          create={AdvertismentsCreate}
          options={{ label: "Oglašavanje" }}
          icon={ViewCarouselIcon}
        />
      </Admin>
    );
  }
}

export default App;
