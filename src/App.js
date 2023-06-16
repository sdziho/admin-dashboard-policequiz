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
  SubcategoriesList,
  SubcategoriesEdit,
  SubcategoriesCreate,
} from "./pages/Subcategories";
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
import ClassIcon from "@mui/icons-material/Class";
import InventoryIcon from "@mui/icons-material/Quiz";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import { defaultTheme } from "react-admin";
import { createTheme } from "@material-ui/core/styles";
import CroatianTranslate from "./croatian";
import CustomAppBar from "./CustomAppBar";
import env from "react-dotenv";

import "./App.css";

const CustomLayout = (props) => <Layout {...props} appBar={CustomAppBar} />;

const customTheme = createTheme({
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
console.log(process.env);
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
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
          name="subcategories"
          options={{ label: "Potkategorije" }}
          list={SubcategoriesList}
          edit={SubcategoriesEdit}
          create={SubcategoriesCreate}
          icon={ClassIcon}
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
