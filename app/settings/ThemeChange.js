import { Text, SafeAreaView } from "react-native"
import React from "react"
import { Stack } from "expo-router"
import { COLORS, SHADOWS, SIZES } from "../../constants"
import { useTheme } from "../../context/ThemeProvider"
import { Switch, View } from "react-native"
import { TouchableOpacity } from "react-native"
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn"

const ThemeChange = () => {
	const { theme, toggleTheme } = useTheme()
	const isDarkMode = theme === "dark"

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: isDarkMode ? COLORS.darkBackground : COLORS.lightWhite,
			}}
		>
			<ScreenHeaderBtn />
			<View
				style={{
					justifyContent: "space-between",
					padding: SIZES.medium,
					borderRadius: SIZES.small,
					backgroundColor: isDarkMode ? COLORS.lightWhite : COLORS.darkBackground,
					...SHADOWS.medium,
					shadowColor: COLORS.white,
					marginVertical: SIZES.medium,
					marginHorizontal: SIZES.medium,
				}}
			>
				<View
					style={{
						display: "flex",
						justifyContent: "space-between",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<Text
						style={{
							color: isDarkMode ? COLORS.darkText : COLORS.lightText,
							fontSize: SIZES.medium,
							fontFamily: "DMBold",
							marginHorizontal: SIZES.medium,
							marginVertical: SIZES.small,
						}}
					>
						{isDarkMode ? "Dark theme" : "Light theme"}
					</Text>

					<Switch
						trackColor={{ false: COLORS.lightText, true: COLORS.darkText }}
						value={isDarkMode}
						onValueChange={toggleTheme}
					/>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default ThemeChange
