import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalLoading } from "../Common/loading";
import NotFound from "../Components/notFound";
import { EmployyeeById } from "../Pages/private";
import { PrivateRoutes, PrivateRoutesHome, ValidatePrivate } from "./private";
import { AuthRoutes, ValidateAuth } from "./public";

const Routers = () => {
  return (
    <BrowserRouter basename={"/"}>
      <Suspense fallback={<GlobalLoading />}>
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
            <Route path={"/"} element={<EmployyeeById />}>
              {PrivateRoutesHome.map(({ path, component }, i) => (
                <Route path={"/employee"+path} element={component} key={i} />
              ))}
            </Route>
          </Route>

          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;
