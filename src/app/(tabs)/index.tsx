import SwipeableNavigator from "@/components/SwipeableNavigator";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import * as SQLite from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

const db = SQLite.openDatabaseSync("flashcards.db");
const { height } = Dimensions.get("window");

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const navigation = useNavigation();
  const { t } = useLanguage();

  const [subjectsList, setSubjectsList] = useState<any[]>([]);
  const [lessonsList, setLessonsList] = useState<any[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
    null,
  );
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [selectedSubjectName, setSelectedSubjectName] = useState<string>("");
  const [selectedLessonName, setSelectedLessonName] = useState<string>("");
  const [cards, setCards] = useState<any[]>([]);
  const [totalCardsCount, setTotalCardsCount] = useState(0);

  useEffect(() => {
    loadInitialData(true);
    if (navigation) {
      const unsubscribe = navigation.addListener("focus", () => {
        refreshDataOnly();
      });
      return unsubscribe;
    }
  }, [navigation]);

  const loadInitialData = async (isFirstLoad = false) => {
    try {
      // await db.execAsync(
      //   `ALTER TABLE flashcards ADD COLUMN reminderNextDate TEXT;`,
      // );
      const countRes: any = await db.getAllAsync(
        "SELECT COUNT(*) as count FROM flashcards;",
      );
      console.log("Total cards count result:", countRes);

      if (countRes && countRes.length > 0) {
        setTotalCardsCount(countRes[0].count);
      }

      const subs: any = await db.getAllAsync("SELECT * FROM subjects;");
      setSubjectsList(subs || []);

      if (subs && subs.length > 0) {
        if (isFirstLoad || selectedSubjectId === null) {
          const firstSub = subs[0];
          setSelectedSubjectId(firstSub.id);
          setSelectedSubjectName(firstSub.name);
          await loadLessonsForSubject(firstSub.id, true);
        } else {
          if (selectedLessonId !== null) {
            fetchCards(selectedSubjectId, selectedLessonId);
          }
        }
      } else {
        setSubjectsList([]);
        setLessonsList([]);
        setCards([]);
      }
    } catch (err) {
      console.log("Error loading initial data:", err);
    }
  };

  const refreshDataOnly = async () => {
    try {
      const countRes: any = await db.getAllAsync(
        "SELECT COUNT(*) as count FROM flashcards;",
      );
      if (countRes && countRes.length > 0) {
        setTotalCardsCount(countRes[0].count);
      }

      const subs: any = await db.getAllAsync("SELECT * FROM subjects;");
      setSubjectsList(subs || []);

      if (selectedSubjectId !== null && selectedLessonId !== null) {
        fetchCards(selectedSubjectId, selectedLessonId);
      }
    } catch (err) {
      console.log("Error refreshing data:", err);
    }
  };

  const loadLessonsForSubject = async (subId: number, isFirstLoad = false) => {
    try {
      const less: any = await db.getAllAsync(
        "SELECT * FROM lessons WHERE subject_id = ?;",
        [subId],
      );
      setLessonsList(less || []);

      if (less && less.length > 0) {
        if (isFirstLoad || !less.some((l: any) => l.id === selectedLessonId)) {
          setSelectedLessonId(less[0].id);
          setSelectedLessonName(less[0].name);
          fetchCards(subId, less[0].id);
        }
      } else {
        setSelectedLessonId(null);
        setSelectedLessonName("");
        setCards([]);
      }
    } catch (err) {
      console.log("Error loading lessons:", err);
    }
  };

  const fetchCards = async (subId: number, lesId: number) => {
    try {
      const result: any = await db.getAllAsync(
        "SELECT * FROM flashcards WHERE subject_id = ? AND lesson_id = ?;",
        [subId, lesId],
      );
      setCards(result || []);
    } catch (error) {
      console.log("Error fetching filtered cards:", error);
    }
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchCards(subId, lesId);
  //   }, [])
  // );
  useFocusEffect(
    useCallback(() => {
      if (selectedSubjectId && selectedLessonId) {
        fetchCards(selectedSubjectId, selectedLessonId);
        console.log(cards);
      }
    }, [selectedSubjectId, selectedLessonId]),
  );

  // function getTimeAgo(dateString: string | null): string {
  //   if (!dateString) return "Not reviewed yet"; // කندවත් කර නැත්නම්

  //   const now = new Date();
  //   const reviewedDate = new Date(dateString);
  //   const diffTime = now.getTime() - reviewedDate.getTime();
  //   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  //   if (diffDays === 0) return "Today";
  //   if (diffDays === 1) return "1 day ago";
  //   if (diffDays < 30) return `${diffDays} days ago`;

  //   const diffMonths = Math.floor(diffDays / 30);
  //   if (diffMonths === 1) return "1 month ago";
  //   if (diffMonths < 12) return `${diffMonths} months ago`;

  //   const diffYears = Math.floor(diffDays / 365);
  //   return diffYears === 1 ? "1 year ago" : `${diffYears} years ago`;
  // }
  function getTimeAgo(
    dateString: string | null,
    t: (section: string, key: string) => string,
  ): string {
    if (!dateString) return t("timeAgo", "notReviewed");

    const now = new Date();
    const reviewedDate = new Date(dateString);
    const diffTime = now.getTime() - reviewedDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return t("timeAgo", "today");
    if (diffDays === 1) return t("timeAgo", "oneDayAgo");
    if (diffDays < 30) return `${diffDays} ${t("timeAgo", "daysAgo")}`;

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return t("timeAgo", "oneMonthAgo");
    if (diffMonths < 12) return `${diffMonths} ${t("timeAgo", "monthsAgo")}`;

    const diffYears = Math.floor(diffDays / 365);
    return diffYears === 1
      ? t("timeAgo", "oneYearAgo")
      : `${diffYears} ${t("timeAgo", "yearsAgo")}`;
  }
  return (
    // <Animated.View
    //   entering={FadeIn.duration(500)}
    //   exiting={FadeOut.duration(500)}
    // >
    <SwipeableNavigator>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Uda kotase 1/3 size eka saha attractive Welcome Banner ek */}
          <View style={styles.heroContainer}>
            <Image
              // source={{
              //   uri: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
              // }}
              source={{
                uri: "https://images.unsplash.com/photo-1616400619175-5beda3a17896?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
              }}
              style={styles.heroImage}
            />
            <View
              style={[
                styles.heroOverlay,
                // { backgroundColor: colors.primary + "E6" },
              ]}
            >
              <View style={styles.heroContent}>
                <View style={styles.welcomeRow}>
                  <Text style={[styles.welcomeSmall, styles.textShadow]}>
                    {t("homepage", "welcome")}
                  </Text>
                  {/* <View style={styles.cardCountPill}>
                  <Ionicons name="albums-outline" size={12} color="#fff" />
                  <Text style={styles.cardCountText}>
                    {totalCardsCount} Cards
                  </Text>
                </View> */}
                </View>
                <Text style={[styles.heroMainTitle, styles.textShadow]}>
                  Flashcard Hub 🚀
                </Text>
                <Text style={[styles.heroSubText, styles.textShadow]}>
                  {t("homepage", "subtitle")}
                </Text>
              </View>
            </View>
          </View>

          {/* Subject Selection Section */}
          <View style={styles.sectionContainer}>
            <Text style={[styles.label, { color: colors.text }]}>
              {t("homepage", "selectSubject")}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.chipScroll}
            >
              {subjectsList.map((subj) => (
                <TouchableOpacity
                  key={subj.id}
                  style={[
                    styles.subjectChip,
                    {
                      backgroundColor: colors.cardBackground,
                      borderColor: colors.tint + "30",
                    },
                    selectedSubjectId === subj.id && {
                      backgroundColor: colors.primary,
                      borderColor: colors.primary,
                    },
                  ]}
                  onPress={() => {
                    setSelectedSubjectId(subj.id);
                    setSelectedSubjectName(subj.name);
                    loadLessonsForSubject(subj.id, true);
                  }}
                >
                  <Text
                    style={[
                      styles.subjectChipText,
                      {
                        color:
                          selectedSubjectId === subj.id ? "#fff" : colors.text,
                      },
                    ]}
                  >
                    {subj.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Lesson Selection Section */}
          {selectedSubjectId !== null && lessonsList.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={[styles.label, { color: colors.text }]}>
                {t("homepage", "selectLesson")}
              </Text>
              <View style={styles.lessonsGridContainer}>
                {lessonsList.map((les) => (
                  <TouchableOpacity
                    key={les.id}
                    style={[
                      styles.lessonChipGrid,
                      {
                        backgroundColor: colors.cardBackground,
                        borderColor: colors.tint + "30",
                      },
                      selectedLessonId === les.id && {
                        backgroundColor: colors.primary,
                        borderColor: colors.primary,
                      },
                    ]}
                    onPress={() => {
                      setSelectedLessonId(les.id);
                      setSelectedLessonName(les.name);
                      if (selectedSubjectId) {
                        fetchCards(selectedSubjectId, les.id);
                      }
                    }}
                  >
                    <Text
                      style={[
                        styles.lessonChipText,
                        {
                          color:
                            selectedLessonId === les.id
                              ? "#ffffff"
                              : colors.text,
                        },
                      ]}
                    >
                      {les.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Cards List Section */}
          <View style={styles.listContainer}>
            <View style={styles.subTitleRow}>
              <Text style={[styles.subTitle, { color: colors.text }]}>
                {selectedSubjectName} - {selectedLessonName}
              </Text>
              <Text
                style={{ color: colors.tint, fontSize: 12, fontWeight: "600" }}
              >
                {cards.length} {t("homepage", "totalCards")}
              </Text>
            </View>

            {cards.length === 0 ? (
              <View
                style={[
                  styles.emptyContainer,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.tint + "20",
                  },
                ]}
              >
                <Ionicons
                  name="folder-open-outline"
                  size={42}
                  color={colors.tint}
                />
                <Text style={[styles.emptyText, { color: colors.text }]}>
                  {t("homepage", "noCardsMessage")}
                </Text>
              </View>
            ) : (
              cards.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.cardItem,
                    {
                      backgroundColor: colors.cardBackground,
                      borderColor: colors.tint + "20",
                    },
                  ]}
                  activeOpacity={0.85}
                  onPress={() => {
                    const allCardIds = cards.map((c) => c.id);
                    router.push({
                      pathname: "/card-detail",
                      params: {
                        id: item.id,
                        cardIds: JSON.stringify(allCardIds),
                        currentIndex: index,
                      },
                    });
                  }}
                >
                  {/* 🌟 වම් පැත්තේ ලස්සන අයිකන් හෝ මීඩියා ප්‍රිව്യൂ බොක්ස් එක */}
                  <View
                    style={[
                      styles.cardLeftIndicator,
                      { backgroundColor: colors.primary + "12" },
                    ]}
                  >
                    <Ionicons
                      name={
                        item.questionType === "image"
                          ? "image-outline"
                          : item.questionType === "voice"
                            ? "mic-outline"
                            : "book-outline"
                      }
                      size={22}
                      color={colors.primary}
                    />
                  </View>

                  {/* මැද සහ දකුණු පැත්තේ ප්‍රශ්න විස්තර */}
                  {/* <View style={styles.cardInfoSection}>
                    <View style={styles.cardHeaderRow}>
                      <Text
                        style={[styles.cardIndex, { color: colors.primary }]}
                      >
                        {t("common", "card")} #{index + 1}
                      </Text>
                      <View
                        style={[
                          styles.typePill,
                          { backgroundColor: colors.primary + "15" },
                        ]}
                      >
                        <Text
                          style={[styles.typeText, { color: colors.primary }]}
                        >
                          {item.questionType}
                        </Text>
                      </View>
                    </View>

                    <Text
                      style={[
                        styles.cardContentPreview,
                        { color: colors.text },
                      ]}
                      numberOfLines={2}
                    >
                      {item.questionType === "text"
                        ? item.questionContent
                          ? item.questionContent
                          : t("common", "empty")
                        : item.questionType === "image"
                          ? "🖼️ Image Question"
                          : "🎙️ Voice Note"}
                    </Text>
                  </View> */}
                  <View style={styles.cardInfoSection}>
                    {/* <View style={styles.cardHeaderRow}>
                      <Text
                        style={[styles.cardIndex, { color: colors.primary }]}
                      >
                        {t("common", "card")} #{index + 1}
                      </Text>
                      {/* <View
                        style={[
                          styles.typePill,
                          { backgroundColor: colors.primary + "15" },
                        ]}
                      >
                        <Text
                          style={[styles.typeText, { color: colors.primary }]}
                        >
                          {item.questionType === "text"
                            ? t("createCard", "textTypeLabel")
                            : item.questionType === "image"
                              ? t("createCard", "imageTypeLabel")
                              : t("createCard", "audioTypeLabel")}
                        </Text>
                      </View> */}

                    {/* </View> */}
                    <View style={styles.cardHeaderRow}>
                      <Text
                        style={[styles.cardIndex, { color: colors.primary }]}
                      >
                        {t("common", "card")} #{index + 1}
                      </Text>

                      {/* 🌟 මෙතැනින් අන්තිමට Done කළ දවස පෙන්වනු ලැබේ */}
                      <Text
                        style={[
                          styles.timeAgoText,
                          { color: colors.text + "80" },
                        ]}
                      >
                        {getTimeAgo(item.last_reviewed, t)}
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.cardContentPreview,
                        { color: colors.text },
                      ]}
                      numberOfLines={2}
                    >
                      {item.questionType === "text"
                        ? item.questionContent
                          ? item.questionContent
                          : t("common", "empty")
                        : item.questionType === "image"
                          ? `🖼️ ${t("createCard", "imageTypeLabel")}`
                          : `🎙️ ${t("createCard", "audioTypeLabel")}`}
                    </Text>
                  </View>

                  {/* දකුණු පැත්තෙන් ඇතුළට යාමට උදව් වන කුඩා ඊතල අයිකන් එක */}
                  <View style={styles.cardArrowBox}>
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color={colors.tint}
                    />
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </SwipeableNavigator>

    // </Animated.View>
  );
}

const styles = StyleSheet.create({
  timeAgoText: {
    fontSize: 11,
    fontWeight: "500",
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
  },
  cardLeftIndicator: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardInfoSection: {
    flex: 1,
    justifyContent: "center",
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  cardIndex: { fontSize: 11, fontWeight: "bold", letterSpacing: 0.5 },
  typePill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  typeText: { fontSize: 9, fontWeight: "bold", textTransform: "uppercase" },

  cardContentPreview: { fontSize: 13, lineHeight: 18, fontWeight: "500" },
  cardArrowBox: {
    paddingLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  container: { flex: 1 },
  heroContainer: {
    width: "100%",
    height: height * 0.32, // Screen eken 1/3 (approx 32%) height ekak labi
    position: "relative",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: "hidden",
    marginBottom: 10,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    padding: 20,
  },
  heroContent: {
    paddingBottom: 10,
  },
  welcomeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  welcomeSmall: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    opacity: 0.9,
  },
  cardCountPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cardCountText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },
  heroMainTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  heroSubText: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.85,
  },
  sectionContainer: { paddingHorizontal: 16, marginTop: 12 },
  label: { fontSize: 13, fontWeight: "bold", marginBottom: 8 },
  chipScroll: { flexDirection: "row" },
  subjectChip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
  },
  subjectChipText: { fontWeight: "bold", fontSize: 13 },
  lessonsGridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  lessonChipGrid: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
  },
  lessonChipText: { fontSize: 12, fontWeight: "600" },
  listContainer: { paddingHorizontal: 16, marginTop: 20 },
  subTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  subTitle: { fontSize: 16, fontWeight: "bold" },
  emptyContainer: {
    padding: 35,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },
  // cardItem: {
  //   borderRadius: 16,
  //   borderWidth: 1,
  //   marginBottom: 14,
  //   overflow: "hidden",
  //   elevation: 2,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.05,
  //   shadowRadius: 4,
  // },
  cardMediaBox: { width: "100%", height: 130, backgroundColor: "#f3f4f6" },
  cardImage: { width: "100%", height: "100%", resizeMode: "cover" },
  placeholderBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  placeholderText: { fontSize: 12, fontWeight: "bold" },
  // cardInfoSection: { padding: 14 },
  // cardHeaderRow: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   marginBottom: 6,
  // },
  // cardIndex: { fontSize: 12, fontWeight: "bold" },
  // typePill: {
  //   paddingHorizontal: 8,
  //   paddingVertical: 2,
  //   borderRadius: 6,
  // },
  // typeText: { fontSize: 10, fontWeight: "bold", textTransform: "uppercase" },
  // cardContentPreview: { fontSize: 14, lineHeight: 20, fontWeight: "500" },
});
