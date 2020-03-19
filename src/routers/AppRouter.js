import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// auth routes
import ChangePasswordPage from '../screens/ChangePasswordPage'
import SigninPage from '../screens/SigninPage'
import SignupPage from '../screens/SignupPage'
import VerifyPasswordPage from '../screens/VerifyPasswordPage'
import VerifyAccountPage from '../screens/VerifyAccountPage'

// plan routes
import AboutPage from '../screens/AboutPage'
import AccountPage from '../screens/AccountPage'
import AppPage from '../screens/AppPage'
import ContactPage from '../screens/ContactPage'
import CreatePlanPage from '../screens/CreatePlanPage'
import NotFoundPage from '../screens/NotFoundPage'
import PlanPage from '../screens/PlanPage'
import PrivacyPolicyPage from '../screens/PrivacyPolicyPage'
import SearchPage from '../screens/SearchPage'
import UserPage from '../screens/UserPage'
import SubbedPlanPage from '../screens/SubbedPlanPage'
import VerifyDeleteAccountPage from '../screens/VerifyDeleteAccountPage'

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path='/change-password' component={ChangePasswordPage} />
                <Route path='/signin' component={SigninPage} />
                <Route path='/signup' component={SignupPage} />
                <Route path='/verify-password' component={VerifyPasswordPage} />
                <Route path='/verify-user' component={VerifyAccountPage} />

                <Route path='/app' component={AppPage} />
                <Route path='/' component={AboutPage} exact={true} />
                <Route path='/account' component={AccountPage} />
                <Route path='/contact' component={ContactPage} />
                <Route path='/create-plan' component={CreatePlanPage} />
                <Route path='/plan' component={PlanPage} />
                <Route path='/privacy-policy' component={PrivacyPolicyPage} />
                <Route path='/search' component={SearchPage} />
                <Route path='/user-page' component={UserPage} />
                <Route path='/subbed-plan' component={SubbedPlanPage} />
                <Route path='/verify-delete-account' component={VerifyDeleteAccountPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter