import React, { lazy, Suspense } from "react";

import Home from "../page/home/index.jsx";

const TestList = lazy(() => import("../page/testlist/index.jsx"));


const lazyComponent = (Element) => <Suspense fallback={<>loading...</>}>{Element}</Suspense>


const routerList = [
    {
        name: '首页',
        path: "/",
        element: <Home />,
        base: true,
        children: [
            {
                name: '测试列表',
                path: "/testList",
                element: lazyComponent(<TestList />)
            }
        ]
    }
]


export default routerList;