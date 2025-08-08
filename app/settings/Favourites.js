import React, { useState, useEffect } from "react"
import { SafeAreaView, ScrollView, View, Text, ActivityIndicator, StyleSheet } from "react-native"
import { useFocusEffect } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { useTheme } from "../../context/ThemeProvider"

import DailyMeditation from "../../components/DailyMeditation"
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn"
import { COLORS, FONT, SIZES } from "../../constants"

const getThemeStyles = (isDarkMode) => ({
	container: {
		backgroundColor: isDarkMode ? COLORS.darkBackground : COLORS.lightBackground,
	},
	text: {
		color: isDarkMode ? COLORS.lightText : COLORS.darkText,
		fontSize: SIZES.large,
	},
})
const Favourites = () => {
	const [favorites, setFavorites] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	const { theme, toggleTheme } = useTheme()
	const isDarkMode = theme === "dark"

	const themeStyles = getThemeStyles(isDarkMode)

	const loadFavorites = async () => {
		try {
			const storedFavorites = await AsyncStorage.getItem("favorites")
			const favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : []
			setFavorites(favoritesArray)
		} catch (error) {
			console.error("Error loading favorites:", error)
		} finally {
			setIsLoading(false)
		}
	}

	useFocusEffect(
		React.useCallback(() => {
			loadFavorites()
		}, [])
	)

	return (
		<SafeAreaView style={{ ...themeStyles.container, flex: 1 }}>
			<ScreenHeaderBtn />
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.container}>
					{isLoading ? (
						<ActivityIndicator size="large" color={COLORS.primary} />
					) : favorites.length === 0 ? (
						<Text style={styles.headerTitle}>No favorite items found.</Text>
					) : (
						<>
							<Text style={{ ...themeStyles.text, textAlign: "center", fontWeight: "bold" }}>
								My Favorites
							</Text>
							<DailyMeditation meditations={favorites} isDarkMode={isDarkMode} />
						</>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: SIZES.xLarge,
		padding: SIZES.medium,
	},
	headerTitle: {
		fontSize: SIZES.large,
		fontFamily: FONT.medium,
		color: COLORS.primary,
		textAlign: "center",
		marginTop: 20,
	},
})

export default Favourites
