import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthRoutes, ValidateAuth } from "./public";
import { PrivateRoutes, ValidatePrivate } from "./private";

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
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;
