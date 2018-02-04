import * as React from "react";
import { Text, Container, List, ListItem, Content } from "native-base";
import { NavigationActions } from "react-navigation";
import {Image, ImageBackground} from "react-native";

const routes = [
	{
		route: "Home",
		caption: "Home",
	},
    {
        route: "Friends",
        caption: "Friends",
    },
    {
        route: "Profile",
        caption: "Profile",
    },
	{
		route: "Logout",
		caption: "Logout",
	},
];

export interface Props {
	navigation: any,
    onLogout: Function,
}
export interface State {}
const resetAction = NavigationActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: "Login" })],
});
export default class Sidebar extends React.Component<Props, State> {

	constructor(props) {
		super(props);
		this.state = {
			imageUrl: null,
		}
	}

	componentDidMount() {

	}

	render() {
		return (
			<Container>
				<Content>
					<Image
						square
						style={{height: 80, width: 70}}
						source={{
							uri: this.state.imageUrl
						}}
					/>
					<List
						style={{ marginTop: 40 }}
						dataArray={routes}
						renderRow={data => {
							return (
								<ListItem
									button
									onPress={() => {
										data.route === "Login"
											? this.props.navigation.dispatch(resetAction)
											: this.props.navigation.navigate(data.route);
									}}
								>
									<Text>{data.caption}</Text>
								</ListItem>
							);
						}}
					/>
				</Content>
			</Container>
		);
	}
}
