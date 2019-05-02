import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import { Router } from 'react-router';
import exportGlobal from '../utils/exportGlobal';
import store from './store/Store';
import {Provider} from "react-redux";
import { ToastContainer } from 'react-toastify';
import history from './history';
import Inspection from '../components/Inspection';

interface ITicketsProps {
}


export default class App extends Component<ITicketsProps> {

  render() {

    // return (
    //   <Provider store={store}>
    //     <div>
    //       <TooltipHOC ref={(ref) => {
    //         this.tooltip = ref;
    //       }} />
    //       <ToastContainer toastClassName="ticket-toast" autoClose={10000} closeButton={false}/>
    //       <UserContext.Provider value={current_user}>
    //         <NoticeContext.Provider value={noticesController}>
    //           <TooltipContext.Provider value={() => this.tooltip}>
    //             <Router history={history}>
    //               <Switch>
    //                 <Route exact path="/inspection/edit/:id" component={Inspection} />
    //               </Switch>
    //             </Router>
    //           </TooltipContext.Provider>
    //         </NoticeContext.Provider>
    //       </UserContext.Provider>
    //     </div>
    //   </Provider>
    // );

    return (
      <Provider store={store}>
        <div>
          <ToastContainer toastClassName="ticket-toast" autoClose={10000} closeButton={false}/>
            <Router history={history}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/inspection/edit/:id" component={Inspection} />
              </Switch>
            </Router>
        </div>
      </Provider>
    );
  }
}

function Home() {
  return <h2>Home</h2>;
}

exportGlobal('frontend/src/platform/App', App);
