import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoutes, ValidatePrivate } from "./private";
import { AuthRoutes, ValidateAuth } from "./public";
import NotFound from "../Components/notFound";

const Routers = () => {
  return (
    <BrowserRouter basename={"/"}>
      <Suspense fallback={"loading"}>
        <Routes>
          <Route path="/" element={<ValidateAuth />}>
            {AuthRoutes.map(({ path, component }, i) => (
              <Route path={path} element={component} key={i} />
            ))}
          </Route>
          <Route path={"/"} element={<ValidatePrivate />}>
            {PrivateRoutes.map(({ path, component }, i) => (
              <Route path={path} element={component} key={i} />
            ))}
          </Route>
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;
