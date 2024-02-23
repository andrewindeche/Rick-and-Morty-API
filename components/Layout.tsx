import React, { ReactNode } from 'react';
import NavigationBar from './NavigationBar'

interface Layout {
    children: ReactNode;
}
const Layout: React.FC = ({children}) => {
    return(
        <div>
         <NavigationBar />
            {children}
        </div>
    )
}

export default Layout;