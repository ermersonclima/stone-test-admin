import * as React from "react";
import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from "./components/users.tsx";
import { PostList, PostCreate, PostEdit } from "./components/posts.tsx";
import Dashboard from "./components/Dashboard.tsx";
import authProvider from "./authProvider.ts";
import dataProvider from "./dataProvider.ts";

const dataProviderFromJsonplaceholder = jsonServerProvider("https://jsonplaceholder.typicode.com");
const App = () => (
  <Admin dashboard={Dashboard} dataProvider={dataProviderFromJsonplaceholder} authProvider={authProvider}>
    <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
    <Resource name="users" list={UserList} icon={UserIcon} />
  </Admin>
);
export default App;