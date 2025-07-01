import type React from "react";

import { useState, useRef, useEffect, useCallback } from "react";
import "./CurriculumCourse.css";
import FlipBookUploader from "./FlipBookUploader"; // adjust the path as needed

const CurriculumCourse = ({
  showSummary: externalShowSummary,
}: {
  showSummary?: boolean;
}) => {
  const [modules, setModules] = useState([
    {
      id: 1,
      title: "Module 1",
      description: "",
      videos: [] as { name: string; url: string }[],
      files: [] as {
        name: string;
        content: string;
        type?: string;
        url?: string;
      }[],
      chapters: [
        {
          title: "Chapter 1",
          isEditing: false,
          videos: [] as { name: string; url: string }[],
          files: [] as {
            name: string;
            content: string;
            type?: string;
            url?: string;
          }[],
          description: "",
          author: "",
          lessons: [
            {
              title: "Lesson 1",
              isEditing: false,
              videos: [],
              files: [],
              flipbooks: [],
              description: "",
              author: "",
              duration: { hours: "", mins: "" },
            },
          ],
        },
      ] as {
        title: string;
        isEditing?: boolean;
        videos: { name: string; url: string }[];
        files: { name: string; content: string; type?: string; url?: string }[];
        description: string;
        author?: string;
        lessons: {
          title: string;
          isEditing?: boolean;
          videos: { name: string; url: string }[];
          files: {
            name: string;
            content: string;
            type?: string;
            url?: string;
          }[];
          flipbooks: { name: string; url: string; pages: string[] }[];
          description: string;
          author?: string;
          duration: { hours: string; mins: string };
        }[];
      }[],
      assignments: [
        { id: 1, title: "Assignment 1", description: "Sample assignment" },
        { id: 2, title: "Assignment 2", description: "Sample assignment 2" },
      ] as any[],
      quizzes: [
        { id: 1, title: "Quiz 1", description: "Sample quiz" },
      ] as any[],
      author: "",
    },
  ]);

  // Author mode state
  const [authorMode, setAuthorMode] = useState<"single" | "individual">(
    "single"
  );
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const authors = ["Sampath Kasirajan", "Suresh Murugan"];

  const [showPopup, setShowPopup] = useState(false);
  const [showLessonPopup, setShowLessonPopup] = useState(false);
  const [showAssignmentPopup, setShowAssignmentPopup] = useState(false);
  const [showQuizPopup, setShowQuizPopup] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "description" | "videos" | "files"
  >("description");
  const [lessonActiveTab, setLessonActiveTab] = useState<"flipbook" | "videos">(
    "flipbook"
  );
  const [description, setDescription] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [activeItem, setActiveItem] = useState<{
    type: "module" | "chapter" | "lesson";
    moduleIndex: number;
    chapterIndex?: number;
    lessonIndex?: number;
  } | null>(null);
  const [savedModules, setSavedModules] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    content: string;
    type?: string;
    url?: string;
  } | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Add state for showing summary
  const [showSummary, setShowSummary] = useState(false);

  // Use external showSummary if provided
  const currentShowSummary =
    externalShowSummary !== undefined ? externalShowSummary : showSummary;

  // Summary view states
  const [expandedSummaryModules, setExpandedSummaryModules] = useState<
    Set<number>
  >(new Set());
  const [expandedSummaryChapters, setExpandedSummaryChapters] = useState<
    Set<string>
  >(new Set());
  const [activeChapterTab, setActiveChapterTab] = useState<{
    [key: string]: "lessons" | "quizzes" | "assignments";
  }>({});

  // Delete confirmation state
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    show: boolean;
    type: "module" | "chapter" | "lesson" | "quiz" | "assignment";
    item: any;
    moduleIndex?: number;
    chapterIndex?: number;
    lessonIndex?: number;
    itemIndex?: number;
  } | null>(null);

  // Lesson duration state
  const [lessonDuration, setLessonDuration] = useState({ hours: "", mins: "" });

  // Flipbook state
  const [selectedFlipbook, setSelectedFlipbook] = useState<{
    name: string;
    url: string;
    pages: string[];
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Assignment form state
  const [assignmentData, setAssignmentData] = useState({
    title: "",
    description: "",
    submissionMethod: "Online",
    dueDate: "",
    allowedFormats: "PDF, Word, Excel, JPEG",
    allowCollaboration: false,
    notifyBeforeDue: false,
  });

  // Quiz form state
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    dueDate: "",
    timeLimit: "1 Minute",
    attempts: "1",
    questions: [] as {
      id: number;
      question: string;
      answers: string[];
      correctAnswer: number;
    }[],
    shuffleQuestions: false,
    shuffleAnswers: false,
  });

  // Current question being created
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    answers: ["", "", "", ""],
    correctAnswer: 0,
  });

  const [showQuestionForm, setShowQuestionForm] = useState(false);

  // Add editing state for questions
  const [editingQuestion, setEditingQuestion] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const flipbookInputRef = useRef<HTMLInputElement>(null);
  const lessonVideoInputRef = useRef<HTMLInputElement>(null);
  const assignmentFileInputRef = useRef<HTMLInputElement>(null);
  const [editingIndex, setEditingIndex] = useState<{
    type: "module" | "chapter" | "lesson";
    index: number;
  } | null>(null);
  const [expandedItems, setExpandedItems] = useState<{
    module: number | null;
    chapter: number | null;
  }>({ module: null, chapter: null });

  // Add this after other useRef declarations
  // FIXED: Better locking mechanism with timestamp
  const addingChapterRef = useRef<{ [key: number]: number }>({});
  // FIXED: More robust addChapter function with better duplicate prevention
  const addingChapterTimeoutRef = useRef<{
    [key: number]: ReturnType<typeof setTimeout> | null;
  }>({});

  // Add this useEffect to monitor modules changes:
  useEffect(() => {
    console.log(`📈 Modules updated. Total modules: ${modules.length}`);
    modules.forEach((module, index) => {
      console.log(`📋 Module ${index + 1}: ${module.chapters.length} chapters`);
    });
  }, [modules]);

  // Reset chapter expansion when module changes
  useEffect(() => {
    if (expandedItems.module !== null) {
      // When module changes, reset chapter expansion
      setExpandedItems((prev) => ({
        module: prev.module,
        chapter: null,
      }));
    }
  }, [expandedItems.module]);

  // Apply single author to all items
  useEffect(() => {
    if (authorMode === "single" && selectedAuthor) {
      setModules((prev) => {
        return prev.map((module) => {
          // Apply author to module
          const updatedModule = { ...module, author: selectedAuthor };

          // Apply author to all chapters
          const updatedChapters = module.chapters.map((chapter) => {
            // Apply author to chapter
            const updatedChapter = { ...chapter, author: selectedAuthor };

            // Apply author to all lessons
            const updatedLessons = chapter.lessons.map((lesson) => {
              return { ...lesson, author: selectedAuthor };
            });

            return { ...updatedChapter, lessons: updatedLessons };
          });

          return { ...updatedModule, chapters: updatedChapters };
        });
      });
    }
  }, [authorMode, selectedAuthor]);

  // Initialize saved modules with current modules
  useEffect(() => {
    setSavedModules(JSON.parse(JSON.stringify(modules)));
  }, []);

  const openPopup = (
    type: "module" | "chapter" | "lesson",
    moduleIndex: number,
    chapterIndex?: number,
    lessonIndex?: number
  ) => {
    setActiveItem({ type, moduleIndex, chapterIndex, lessonIndex });

    if (type === "lesson") {
      // Open special lesson popup
      if (chapterIndex !== undefined && lessonIndex !== undefined) {
        const lesson =
          modules[moduleIndex].chapters[chapterIndex].lessons[lessonIndex];
        setLessonDuration(lesson.duration || { hours: "", mins: "" });
        if (lesson.flipbooks && lesson.flipbooks.length > 0) {
          setSelectedFlipbook(lesson.flipbooks[0]);
          setCurrentPage(0);
        }
      }
      setShowLessonPopup(true);
      setLessonActiveTab("flipbook");
    } else {
      // Open regular popup for module/chapter
      if (type === "module") {
        setDescription(modules[moduleIndex].description);
      } else if (type === "chapter" && chapterIndex !== undefined) {
        setDescription(
          modules[moduleIndex].chapters[chapterIndex].description || ""
        );
      }

      // Set current author for individual mode
      if (authorMode === "individual") {
        const currentAuthor = getCurrentAuthor();
        setSelectedAuthor(currentAuthor);
      }

      setShowPopup(true);
      setActiveTab("description");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedFile(null);
    setIsFullScreen(false);
    setVideoPreview("");

    // Reset selected author for individual mode
    if (authorMode === "individual") {
      setSelectedAuthor("");
    }
  };

  const closeLessonPopup = () => {
    setShowLessonPopup(false);
    setSelectedFlipbook(null);
    setCurrentPage(0);
    setLessonDuration({ hours: "", mins: "" });
  };

  const openAssignmentPopup = () => {
    setShowAssignmentPopup(true);
  };

  const closeAssignmentPopup = () => {
    setShowAssignmentPopup(false);
  };

  const openQuizPopup = () => {
    setShowQuizPopup(true);
    setShowQuestionForm(false);
  };

  const closeQuizPopup = () => {
    setShowQuizPopup(false);
    setShowQuestionForm(false);
    // Reset quiz data
    setQuizData({
      title: "",
      description: "",
      dueDate: "",
      timeLimit: "1 Minute",
      attempts: "1",
      questions: [],
      shuffleQuestions: false,
      shuffleAnswers: false,
    });
    setCurrentQuestion({
      question: "",
      answers: ["", "", "", ""],
      correctAnswer: 0,
    });
  };

  const handleFlipbookUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0] && activeItem) {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);

      // Simulate converting PDF/Word to pages (in real app, you'd use a PDF library)
      const mockPages = Array.from(
        { length: 10 },
        (_, i) => `/placeholder.svg?height=400&width=300&text=Page ${i + 1}`
      );

      const flipbook = {
        name: file.name,
        url: fileUrl,
        pages: mockPages,
      };

      setModules((prev) => {
        const newModules = [...prev];
        if (
          activeItem.type === "lesson" &&
          activeItem.chapterIndex !== undefined &&
          activeItem.lessonIndex !== undefined
        ) {
          if (
            !newModules[activeItem.moduleIndex].chapters[
              activeItem.chapterIndex
            ].lessons[activeItem.lessonIndex].flipbooks
          ) {
            newModules[activeItem.moduleIndex].chapters[
              activeItem.chapterIndex
            ].lessons[activeItem.lessonIndex].flipbooks = [];
          }
          newModules[activeItem.moduleIndex].chapters[
            activeItem.chapterIndex
          ].lessons[activeItem.lessonIndex].flipbooks.push(flipbook);
        }
        return newModules;
      });

      setSelectedFlipbook(flipbook);
      setCurrentPage(0);
    }
  };

  const handleLessonVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0] && activeItem) {
      const file = e.target.files[0];
      const videoUrl = URL.createObjectURL(file);

      setModules((prev) => {
        const newModules = [...prev];
        if (
          activeItem.type === "lesson" &&
          activeItem.chapterIndex !== undefined &&
          activeItem.lessonIndex !== undefined
        ) {
          const existingVideos =
            newModules[activeItem.moduleIndex].chapters[activeItem.chapterIndex]
              .lessons[activeItem.lessonIndex].videos;

          // Check if file with same name already exists
          const fileExists = existingVideos.some(
            (video) => video.name === file.name
          );

          if (!fileExists) {
            newModules[activeItem.moduleIndex].chapters[
              activeItem.chapterIndex
            ].lessons[activeItem.lessonIndex].videos.push({
              name: file.name,
              url: videoUrl,
            });
          }
        }
        return newModules;
      });

      // Clear the input value
      if (lessonVideoInputRef.current) {
        lessonVideoInputRef.current.value = "";
      }
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0] && activeItem) {
      const file = e.target.files[0];
      const videoUrl = URL.createObjectURL(file);

      setModules((prev) => {
        const newModules = [...prev];

        // Check if file already exists to prevent duplicates
        let existingVideos: { name: string; url: string }[] = [];

        if (activeItem.type === "module") {
          existingVideos = newModules[activeItem.moduleIndex].videos;
        } else if (
          activeItem.type === "chapter" &&
          activeItem.chapterIndex !== undefined
        ) {
          existingVideos =
            newModules[activeItem.moduleIndex].chapters[activeItem.chapterIndex]
              .videos;
        }

        // Check if file with same name already exists
        const fileExists = existingVideos.some(
          (video) => video.name === file.name
        );

        if (!fileExists) {
          if (activeItem.type === "module") {
            newModules[activeItem.moduleIndex].videos.push({
              name: file.name,
              url: videoUrl,
            });
          } else if (
            activeItem.type === "chapter" &&
            activeItem.chapterIndex !== undefined
          ) {
            newModules[activeItem.moduleIndex].chapters[
              activeItem.chapterIndex
            ].videos.push({
              name: file.name,
              url: videoUrl,
            });
          }

          setVideoPreview(videoUrl);
        }

        return newModules;
      });

      // Clear the input value to prevent duplicate uploads
      if (videoInputRef.current) {
        videoInputRef.current.value = "";
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && activeItem) {
      // Get existing files first to check for duplicates
      let existingFiles: {
        name: string;
        content: string;
        type?: string;
        url?: string;
      }[] = [];

      if (activeItem.type === "module") {
        existingFiles = modules[activeItem.moduleIndex].files;
      } else if (
        activeItem.type === "chapter" &&
        activeItem.chapterIndex !== undefined
      ) {
        existingFiles =
          modules[activeItem.moduleIndex].chapters[activeItem.chapterIndex]
            .files;
      }

      Array.from(e.target.files).forEach((file) => {
        const fileExtension = file.name.split(".").pop()?.toLowerCase();
        const fileUrl = URL.createObjectURL(file);

        // Check if file with same name already exists
        const fileExists = existingFiles.some(
          (existingFile) => existingFile.name === file.name
        );

        if (fileExists) {
          return; // Skip this file if it already exists
        }

        // Handle different file types
        if (fileExtension === "pdf") {
          setModules((prev) => {
            const newModules = [...prev];
            const fileInfo = {
              name: file.name,
              content: `PDF Document: ${file.name}\n\nThis is a PDF file. Click the fullscreen button to view it properly.`,
              type: "pdf",
              url: fileUrl,
            };

            if (activeItem.type === "module") {
              newModules[activeItem.moduleIndex].files.push(fileInfo);
            } else if (
              activeItem.type === "chapter" &&
              activeItem.chapterIndex !== undefined
            ) {
              newModules[activeItem.moduleIndex].chapters[
                activeItem.chapterIndex
              ].files.push(fileInfo);
            }
            return newModules;
          });
        } else if (fileExtension === "doc" || fileExtension === "docx") {
          // For Word documents, show a preview message instead of trying to display
          setModules((prev) => {
            const newModules = [...prev];
            const fileInfo = {
              name: file.name,
              content: `Microsoft Word Document: ${file.name}

File Type: ${fileExtension?.toUpperCase()}
Size: ${(file.size / 1024 / 1024).toFixed(2)} MB

This is a Microsoft Word document. The content cannot be displayed directly in the browser due to security restrictions.

To view this document:
1. Click the fullscreen button for better viewing options
2. Or download the file to view it in Microsoft Word

Document Preview:
This document contains formatted text, images, tables, other Word-specific formatting that requires Microsoft Word or a compatible application to view properly.`,
              type: "word",
              url: fileUrl,
            };

            if (activeItem.type === "module") {
              newModules[activeItem.moduleIndex].files.push(fileInfo);
            } else if (
              activeItem.type === "chapter" &&
              activeItem.chapterIndex !== undefined
            ) {
              newModules[activeItem.moduleIndex].chapters[
                activeItem.chapterIndex
              ].files.push(fileInfo);
            }
            return newModules;
          });
        } else {
          // For text files, read content normally
          const reader = new FileReader();
          reader.onload = (event) => {
            const content = event.target?.result as string;

            setModules((prev) => {
              const newModules = [...prev];
              const fileInfo = {
                name: file.name,
                content: content,
                type: fileExtension || "text",
                url: fileUrl,
              };

              if (activeItem.type === "module") {
                newModules[activeItem.moduleIndex].files.push(fileInfo);
              } else if (
                activeItem.type === "chapter" &&
                activeItem.chapterIndex !== undefined
              ) {
                newModules[activeItem.moduleIndex].chapters[
                  activeItem.chapterIndex
                ].files.push(fileInfo);
              }
              return newModules;
            });
          };
          reader.readAsText(file);
        }
      });

      // Clear the input value to prevent duplicate uploads
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const saveLessonContent = () => {
    if (activeItem && activeItem.type === "lesson") {
      setModules((prev) => {
        const newModules = [...prev];
        if (
          activeItem.chapterIndex !== undefined &&
          activeItem.lessonIndex !== undefined
        ) {
          newModules[activeItem.moduleIndex].chapters[
            activeItem.chapterIndex
          ].lessons[activeItem.lessonIndex].duration = lessonDuration;

          // If in individual author mode, set the author
          if (authorMode === "individual" && selectedAuthor) {
            newModules[activeItem.moduleIndex].chapters[
              activeItem.chapterIndex
            ].lessons[activeItem.lessonIndex].author = selectedAuthor;
          }
        }
        return newModules;
      });
    }
    // Remove this line: closeLessonPopup()
  };

  const saveContent = () => {
    if (activeItem) {
      setModules((prev) => {
        const newModules = [...prev];
        if (activeItem.type === "module") {
          newModules[activeItem.moduleIndex].description = description;

          // If in individual author mode, set the author
          if (authorMode === "individual" && selectedAuthor) {
            newModules[activeItem.moduleIndex].author = selectedAuthor;
          }
        } else if (
          activeItem.type === "chapter" &&
          activeItem.chapterIndex !== undefined
        ) {
          newModules[activeItem.moduleIndex].chapters[
            activeItem.chapterIndex
          ].description = description;

          // If in individual author mode, set the author
          if (authorMode === "individual" && selectedAuthor) {
            newModules[activeItem.moduleIndex].chapters[
              activeItem.chapterIndex
            ].author = selectedAuthor;
          }
        }
        return newModules;
      });
    }
    closePopup();
  };

  const saveAssignment = () => {
    // Add assignment to the current module
    setModules((prev) => {
      const newModules = [...prev];
      if (newModules.length > 0) {
        newModules[0].assignments.push({
          ...assignmentData,
          id: Date.now(),
        });
      }
      return newModules;
    });

    setShowAssignmentPopup(false);
    // Reset form
    setAssignmentData({
      title: "",
      description: "",
      submissionMethod: "Online",
      dueDate: "",
      allowedFormats: "PDF, Word, Excel, JPEG",
      allowCollaboration: false,
      notifyBeforeDue: false,
    });
  };

  const addQuestionToList = () => {
    if (
      currentQuestion.question.trim() &&
      currentQuestion.answers.some((answer) => answer.trim())
    ) {
      const newQuestion = {
        id: Date.now(),
        question: currentQuestion.question,
        answers: currentQuestion.answers.filter((answer) => answer.trim()),
        correctAnswer: currentQuestion.correctAnswer,
      };

      setQuizData((prev) => ({
        ...prev,
        questions: [...prev.questions, newQuestion],
      }));

      // Reset current question
      setCurrentQuestion({
        question: "",
        answers: ["", "", "", ""],
        correctAnswer: 0,
      });

      setShowQuestionForm(false);
    }
  };

  const removeQuestion = (questionId: number) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }));
  };

  const saveQuiz = () => {
    const finalQuizData = { ...quizData };

    // Shuffle questions if enabled
    if (finalQuizData.shuffleQuestions) {
      finalQuizData.questions = [...finalQuizData.questions].sort(
        () => Math.random() - 0.5
      );
    }

    // Shuffle answers if enabled
    if (finalQuizData.shuffleAnswers) {
      finalQuizData.questions = finalQuizData.questions.map((question) => {
        const shuffledAnswers = [...question.answers];
        const correctAnswerText = question.answers[question.correctAnswer];

        // Shuffle the answers array
        for (let i = shuffledAnswers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledAnswers[i], shuffledAnswers[j]] = [
            shuffledAnswers[j],
            shuffledAnswers[i],
          ];
        }

        // Find new index of correct answer
        const newCorrectIndex = shuffledAnswers.indexOf(correctAnswerText);

        return {
          ...question,
          answers: shuffledAnswers,
          correctAnswer: newCorrectIndex,
        };
      });
    }

    // Add quiz to the current module
    setModules((prev) => {
      const newModules = [...prev];
      if (newModules.length > 0) {
        newModules[0].quizzes.push({
          ...finalQuizData,
          id: Date.now(),
        });
      }
      return newModules;
    });

    closeQuizPopup();
  };

  const saveModule = (moduleIndex: number) => {
    const moduleToSave = modules[moduleIndex];
    setSavedModules((prev) => {
      // Remove if already exists
      const filtered = prev.filter((m) => m.id !== moduleToSave.id);
      return [...filtered, JSON.parse(JSON.stringify(moduleToSave))];
    });
  };

  const addModule = () => {
    setModules((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: `Module ${prev.length + 1}`,
        description: "",
        videos: [],
        files: [],
        chapters: [],
        assignments: [],
        quizzes: [],
        author: authorMode === "single" ? selectedAuthor : "", // Set author if in single mode
      },
    ]);
    // Don't automatically expand the new module
    setExpandedItems({ module: null, chapter: null });
  };

  const removeModule = (index: number) => {
    setModules((prev) => {
      const newModules = prev.filter((_: any, i: number) => i !== index);
      // Renumber modules after deletion
      return newModules.map((module, idx) => ({
        ...module,
        id: idx + 1,
        title: `Module ${idx + 1}`,
      }));
    });
    // Reset expanded state if deleted module was expanded
    setExpandedItems({ module: null, chapter: null });
  };

  // FIXED: addChapter function - now only adds ONE chapter per click
  // FIXED: Better addChapter function with improved locking

  const addChapter = useCallback(
    (modIndex: number, source = "unknown") => {
      console.log(`🔵 addChapter called: module=${modIndex}, source=${source}`);

      // Clear any existing timeout for this module
      if (addingChapterTimeoutRef.current[modIndex]) {
        clearTimeout(addingChapterTimeoutRef.current[modIndex]!);
        addingChapterTimeoutRef.current[modIndex] = null;
      }

      // Set a timeout to prevent rapid successive calls
      addingChapterTimeoutRef.current[modIndex] = setTimeout(() => {
        console.log(`🟢 EXECUTING: Adding chapter to Module ${modIndex + 1}`);

        setModules((prevModules) => {
          const currentModule = prevModules[modIndex];
          const currentChaptersCount = currentModule.chapters.length;
          const chapterNumber = currentChaptersCount + 1;

          console.log(`📊 Current chapters count:`, currentChaptersCount);

          // Create new chapter
          const newChapter = {
            title: `Chapter ${chapterNumber}`,
            isEditing: true,
            videos: [],
            files: [],
            description: "",
            lessons: [],
            author: authorMode === "single" ? selectedAuthor : undefined,
          };

          // Create new modules array with the new chapter
          const newModules = [...prevModules];
          newModules[modIndex] = {
            ...currentModule,
            chapters: [...currentModule.chapters, newChapter],
          };

          console.log(
            `📊 New chapters count:`,
            newModules[modIndex].chapters.length
          );
          return newModules;
        });

        // Clear the timeout reference
        addingChapterTimeoutRef.current[modIndex] = null;
      }, 100); // Small delay to prevent duplicates
    },
    [authorMode, selectedAuthor]
  );

  const removeChapter = (modIndex: number, chapIndex: number) => {
    setModules((prev) => {
      const newModules = [...prev];
      newModules[modIndex].chapters = newModules[modIndex].chapters.filter(
        (_: any, i: number) => i !== chapIndex
      );
      // Renumber chapters after deletion
      newModules[modIndex].chapters = newModules[modIndex].chapters.map(
        (chapter, idx) => ({
          ...chapter,
          title: chapter.isEditing ? chapter.title : `Chapter ${idx + 1}`,
        })
      );
      return newModules;
    });
  };

  const addLesson = (modIndex: number, chapIndex: number) => {
    const newModules = [...modules];
    const lessonNumber =
      newModules[modIndex].chapters[chapIndex].lessons.length + 1;
    newModules[modIndex].chapters[chapIndex].lessons.push({
      title: `Lesson ${lessonNumber}`,
      isEditing: true,
      videos: [],
      files: [],
      flipbooks: [],
      description: "",
      author: authorMode === "single" ? selectedAuthor : undefined,
      duration: { hours: "", mins: "" },
    });
    setModules(newModules);
    setExpandedItems((prev) => ({ ...prev, chapter: chapIndex }));
  };

  const removeLesson = (
    modIndex: number,
    chapIndex: number,
    lessonIndex: number
  ) => {
    setModules((prev) => {
      const newModules = [...prev];
      newModules[modIndex].chapters[chapIndex].lessons = newModules[
        modIndex
      ].chapters[chapIndex].lessons.filter(
        (_: any, i: number) => i !== lessonIndex
      );
      // Renumber lessons after deletion
      newModules[modIndex].chapters[chapIndex].lessons = newModules[
        modIndex
      ].chapters[chapIndex].lessons.map((lesson, idx) => ({
        ...lesson,
        title: lesson.isEditing ? lesson.title : `Lesson ${idx + 1}`,
      }));
      return newModules;
    });
  };

  const handleTitleChange = (
    type: "module" | "chapter" | "lesson",
    modIndex: number,
    chapIndex?: number,
    lessonIndex?: number,
    value?: string
  ) => {
    const newModules = [...modules];

    if (type === "module") {
      if (value !== undefined) {
        newModules[modIndex].title = value;
      }
    } else if (type === "chapter" && chapIndex !== undefined) {
      if (value !== undefined) {
        newModules[modIndex].chapters[chapIndex].title = value;
      }
      newModules[modIndex].chapters[chapIndex].isEditing = false;
    } else if (
      type === "lesson" &&
      chapIndex !== undefined &&
      lessonIndex !== undefined
    ) {
      if (value !== undefined) {
        newModules[modIndex].chapters[chapIndex].lessons[lessonIndex].title =
          value;
      }
      newModules[modIndex].chapters[chapIndex].lessons[lessonIndex].isEditing =
        false;
    }

    setModules(newModules);
  };

  const toggleModule = (index: number) => {
    // If we're opening a module, close any previously open module and reset chapter state
    // If we're closing a module, just set module to null
    setExpandedItems({
      module: expandedItems.module === index ? null : index,
      chapter: null, // Always reset chapter when switching modules
    });
  };

  const toggleChapter = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      chapter: prev.chapter === index ? null : index,
    }));
  };

  const deleteFile = (index: number) => {
    if (!activeItem) return;

    setModules((prev) => {
      const newModules = [...prev];
      if (activeItem.type === "module") {
        newModules[activeItem.moduleIndex].files = newModules[
          activeItem.moduleIndex
        ].files.filter((_, i) => i !== index);
      } else if (
        activeItem.type === "chapter" &&
        activeItem.chapterIndex !== undefined
      ) {
        newModules[activeItem.moduleIndex].chapters[
          activeItem.chapterIndex
        ].files = newModules[activeItem.moduleIndex].chapters[
          activeItem.chapterIndex
        ].files.filter((_, i) => i !== index);
      }
      return newModules;
    });

    if (selectedFile) {
      setSelectedFile(null);
    }
  };

  const viewFile = (file: {
    name: string;
    content: string;
    type?: string;
    url?: string;
  }) => {
    console.log("Viewing file:", file); // Debug log
    setSelectedFile(file);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // Update the isAnyPopupOpen variable to be used correctly
  const isAnyPopupOpen =
    showPopup ||
    showLessonPopup ||
    showAssignmentPopup ||
    deleteConfirmation?.show;

  // Get current files based on active item
  const getCurrentFiles = () => {
    if (!activeItem) return [];

    if (activeItem.type === "module") {
      return modules[activeItem.moduleIndex].files;
    } else if (
      activeItem.type === "chapter" &&
      activeItem.chapterIndex !== undefined
    ) {
      return modules[activeItem.moduleIndex].chapters[activeItem.chapterIndex]
        .files;
    }

    return [];
  };

  // Get current videos based on active item
  const getCurrentVideos = () => {
    if (!activeItem) return [];

    if (activeItem.type === "module") {
      return modules[activeItem.moduleIndex].videos;
    } else if (
      activeItem.type === "chapter" &&
      activeItem.chapterIndex !== undefined
    ) {
      return modules[activeItem.moduleIndex].chapters[activeItem.chapterIndex]
        .videos;
    }

    return [];
  };

  // Get current lesson videos
  const getCurrentLessonVideos = () => {
    if (!activeItem || activeItem.type !== "lesson") return [];

    if (
      activeItem.chapterIndex !== undefined &&
      activeItem.lessonIndex !== undefined
    ) {
      return modules[activeItem.moduleIndex].chapters[activeItem.chapterIndex]
        .lessons[activeItem.lessonIndex].videos;
    }

    return [];
  };

  // Get current flipbooks
  const getCurrentFlipbooks = () => {
    if (!activeItem || activeItem.type !== "lesson") return [];

    if (
      activeItem.chapterIndex !== undefined &&
      activeItem.lessonIndex !== undefined
    ) {
      return (
        modules[activeItem.moduleIndex].chapters[activeItem.chapterIndex]
          .lessons[activeItem.lessonIndex].flipbooks || []
      );
    }

    return [];
  };

  // Get current author based on active item
  const getCurrentAuthor = () => {
    if (!activeItem) return "";

    if (activeItem.type === "module") {
      return modules[activeItem.moduleIndex].author || "";
    } else if (
      activeItem.type === "chapter" &&
      activeItem.chapterIndex !== undefined
    ) {
      return (
        modules[activeItem.moduleIndex].chapters[activeItem.chapterIndex]
          .author || ""
      );
    } else if (
      activeItem.type === "lesson" &&
      activeItem.chapterIndex !== undefined &&
      activeItem.lessonIndex !== undefined
    ) {
      return (
        modules[activeItem.moduleIndex].chapters[activeItem.chapterIndex]
          .lessons[activeItem.lessonIndex].author || ""
      );
    }

    return "";
  };

  const nextPage = () => {
    if (selectedFlipbook && currentPage < selectedFlipbook.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to toggle summary display
  const toggleSummary = () => {
    setShowSummary(!showSummary);
  };

  // Summary view functions
  const toggleSummaryModule = (moduleIndex: number) => {
    const newExpanded = new Set(expandedSummaryModules);
    if (newExpanded.has(moduleIndex)) {
      newExpanded.delete(moduleIndex);
    } else {
      newExpanded.add(moduleIndex);
    }
    setExpandedSummaryModules(newExpanded);
  };

  const toggleSummaryChapter = (moduleIndex: number, chapterIndex: number) => {
    const key = `${moduleIndex}-${chapterIndex}`;
    const newExpanded = new Set(expandedSummaryChapters);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
      // Set default tab to lessons
      setActiveChapterTab((prev) => ({ ...prev, [key]: "lessons" }));
    }
    setExpandedSummaryChapters(newExpanded);
  };

  const setChapterTab = (
    moduleIndex: number,
    chapterIndex: number,
    tab: "lessons" | "quizzes" | "assignments"
  ) => {
    const key = `${moduleIndex}-${chapterIndex}`;
    setActiveChapterTab((prev) => ({ ...prev, [key]: tab }));
  };

  // Delete functions
  const confirmDelete = (
    type: "module" | "chapter" | "lesson" | "quiz" | "assignment",
    item: any,
    moduleIndex?: number,
    chapterIndex?: number,
    lessonIndex?: number,
    itemIndex?: number
  ) => {
    setDeleteConfirmation({
      show: true,
      type,
      item,
      moduleIndex,
      chapterIndex,
      lessonIndex,
      itemIndex,
    });
  };

  const executeDelete = () => {
    if (!deleteConfirmation) return;

    const { type, moduleIndex, chapterIndex, lessonIndex, itemIndex } =
      deleteConfirmation;

    setSavedModules((prev) => {
      const newModules = [...prev];

      if (type === "module" && moduleIndex !== undefined) {
        return newModules.filter((_: any, i: number) => i !== moduleIndex);
      } else if (
        type === "chapter" &&
        moduleIndex !== undefined &&
        chapterIndex !== undefined
      ) {
        newModules[moduleIndex].chapters = newModules[
          moduleIndex
        ].chapters.filter((_: any, i: number) => i !== chapterIndex);
      } else if (
        type === "lesson" &&
        moduleIndex !== undefined &&
        chapterIndex !== undefined &&
        lessonIndex !== undefined
      ) {
        newModules[moduleIndex].chapters[chapterIndex].lessons = newModules[
          moduleIndex
        ].chapters[chapterIndex].lessons.filter(
          (_: any, i: number) => i !== lessonIndex
        );
      } else if (
        type === "quiz" &&
        moduleIndex !== undefined &&
        itemIndex !== undefined
      ) {
        newModules[moduleIndex].quizzes = newModules[
          moduleIndex
        ].quizzes.filter((_: any, i: number) => i !== itemIndex);
      } else if (
        type === "assignment" &&
        moduleIndex !== undefined &&
        itemIndex !== undefined
      ) {
        newModules[moduleIndex].assignments = newModules[
          moduleIndex
        ].assignments.filter((_: any, i: number) => i !== itemIndex);
      }

      return newModules;
    });

    setDeleteConfirmation(null);
  };

  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

  return (
    <>
      <div
        className={`curriculum-container ${isAnyPopupOpen ? "popup-open" : ""}`}
      >
        {!currentShowSummary ? (
          // Regular curriculum view with frame around everything
          <div className="curriculum-content-frame">
            <div className="curriculum-header">
              <div className="curriculum-title">
                <h2>Curriculum</h2>
              </div>
              <div className="author-mode-container">
                <div className="author-mode-section">
                  <div className="vertical-separator"></div>
                  <div className="author-toggle-wrapper">
                    <label className="author-toggle-label">
                      <span
                        className={`toggle-text ${
                          authorMode === "individual" ? "active" : ""
                        }`}
                      >
                        Assign Authors Individually
                      </span>
                      <div className="author-toggle-switch">
                        <input
                          type="checkbox"
                          checked={authorMode === "individual"}
                          onChange={(e) =>
                            setAuthorMode(
                              e.target.checked ? "individual" : "single"
                            )
                          }
                        />
                        <span className="author-slider"></span>
                      </div>
                    </label>
                    <span
                      className={`toggle-text ${
                        authorMode === "single" ? "active" : ""
                      }`}
                    >
                      Single Author Mode
                    </span>
                  </div>

                  {authorMode === "single" && (
                    <>
                      <div className="vertical-separator"></div>
                      <div className="author-dropdown-inline">
                        <label>Author</label>
                        <select
                          value={selectedAuthor}
                          onChange={(e) => setSelectedAuthor(e.target.value)}
                        >
                          <option value="">Select</option>
                          {authors.map((author, index) => (
                            <option key={index} value={author}>
                              {author}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="header-right-actions">
                <div className="top-right-section">
                  <button className="add-module-btn" onClick={addModule}>
                    <span>+</span> Module
                  </button>
                </div>
              </div>
            </div>

            {/* Main curriculum content */}
            <div className="curriculum-main-content">
              {modules.map((mod, modIndex) => (
                <div key={mod.id} className="module-wrapper">
                  {expandedItems.module === modIndex ? (
                    // Show unified grey background when expanded with frame
                    <div className="module-expanded-area-with-frame">
                      <div className="module-expanded-area">
                        {/* Module row inside the grey area */}
                        <div className="module-row-in-expanded">
                          <button
                            className="toggle-btn"
                            onClick={() => toggleModule(modIndex)}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#333"
                              strokeWidth="2.5"
                            >
                              <path d="M18 15l-6-6-6 6" />
                            </svg>
                          </button>
                          <span className="module-icon">
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#333"
                              strokeWidth="2.5"
                            >
                              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                            </svg>
                          </span>
                          <div className="title-container">
                            {editingIndex?.type === "module" &&
                            editingIndex.index === modIndex ? (
                              <input
                                className="title-input"
                                type="text"
                                value={mod.title}
                                onChange={(e) =>
                                  handleTitleChange(
                                    "module",
                                    modIndex,
                                    undefined,
                                    undefined,
                                    e.target.value
                                  )
                                }
                                onBlur={() => setEditingIndex(null)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") setEditingIndex(null);
                                }}
                              />
                            ) : (
                              <h3
                                onClick={() =>
                                  setEditingIndex({
                                    type: "module",
                                    index: modIndex,
                                  })
                                }
                              >
                                {mod.title}
                              </h3>
                            )}
                          </div>
                          <div className="module-actions">
                            <button
                              className="file-btn"
                              onClick={() => openPopup("module", modIndex)}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#333"
                                strokeWidth="2.5"
                              >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                              </svg>
                            </button>
                            <button
                              className="close-btn"
                              onClick={() => removeModule(modIndex)}
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#333"
                                strokeWidth="2.5"
                              >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>
                          </div>
                          <div className="external-actions-in-expanded">
                            <button
                              className="assignment-btn"
                              onClick={openAssignmentPopup}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#333"
                                strokeWidth="2.5"
                              >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                              </svg>
                            </button>
                            <button
                              className="add-chapter-btn"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log(
                                  `Expanded view: Adding chapter to module ${modIndex}`
                                );
                                addChapter(modIndex, "expanded-view");
                              }}
                            >
                              + Chapter
                            </button>
                          </div>
                        </div>

                        {/* Chapters inside the same grey area */}
                        <div className="chapter-container">
                          {mod.chapters.map((chapter, chapIndex) => (
                            <div key={chapIndex} className="chapter-group">
                              {expandedItems.chapter === chapIndex &&
                              expandedItems.module === modIndex ? (
                                // Chapter expanded with frame
                                <div className="chapter-expanded-area-with-frame">
                                  <div className="chapter-row">
                                    <button
                                      className="toggle-btn"
                                      onClick={() => toggleChapter(chapIndex)}
                                    >
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#333"
                                        strokeWidth="2.5"
                                      >
                                        <path d="M18 15l-6-6-6 6" />
                                      </svg>
                                    </button>
                                    <span className="chapter-icon">
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#333"
                                        strokeWidth="2.5"
                                      >
                                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                      </svg>
                                    </span>
                                    <div className="title-container">
                                      {editingIndex?.type === "chapter" &&
                                      editingIndex.index === chapIndex ? (
                                        <input
                                          className="title-input"
                                          value={chapter.title}
                                          autoFocus
                                          onChange={(e) =>
                                            handleTitleChange(
                                              "chapter",
                                              modIndex,
                                              chapIndex,
                                              undefined,
                                              e.target.value
                                            )
                                          }
                                          onBlur={() => setEditingIndex(null)}
                                          onKeyDown={(e) => {
                                            if (e.key === "Enter")
                                              setEditingIndex(null);
                                          }}
                                        />
                                      ) : (
                                        <span
                                          className="title"
                                          onClick={() =>
                                            setEditingIndex({
                                              type: "chapter",
                                              index: chapIndex,
                                            })
                                          }
                                        >
                                          {chapter.title}
                                        </span>
                                      )}
                                    </div>
                                    <div className="chapter-actions">
                                      <button
                                        className="file-btn"
                                        onClick={() =>
                                          openPopup(
                                            "chapter",
                                            modIndex,
                                            chapIndex
                                          )
                                        }
                                      >
                                        <svg
                                          width="16"
                                          height="16"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="#333"
                                          strokeWidth="2.5"
                                        >
                                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                          <polyline points="14 2 14 8 20 8" />
                                        </svg>
                                      </button>
                                      <button
                                        className="close-btn"
                                        onClick={() =>
                                          removeChapter(modIndex, chapIndex)
                                        }
                                      >
                                        <svg
                                          width="12"
                                          height="12"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="#333"
                                          strokeWidth="2.5"
                                        >
                                          <line x1="18" y1="6" x2="6" y2="18" />
                                          <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>

                                  <div className="lesson-container">
                                    <div className="lessons-vertical-column">
                                      {chapter.lessons.length > 0 ? (
                                        <>
                                          {chapter.lessons.map(
                                            (lesson, lessonIndex) => (
                                              <div
                                                key={lessonIndex}
                                                className="lesson-row-with-add-framed"
                                              >
                                                <div className="lesson-row-framed">
                                                  <span className="lesson-icon">
                                                    <svg
                                                      width="16"
                                                      height="16"
                                                      viewBox="0 0 24 24"
                                                      fill="none"
                                                      stroke="#333"
                                                      strokeWidth="2.5"
                                                    >
                                                      <polygon points="5 3 19 12 5 21 5 3" />
                                                    </svg>
                                                  </span>
                                                  <div className="title-container">
                                                    {editingIndex?.type ===
                                                      "lesson" &&
                                                    editingIndex.index ===
                                                      lessonIndex ? (
                                                      <input
                                                        className="title-input"
                                                        value={lesson.title}
                                                        autoFocus
                                                        onChange={(e) =>
                                                          handleTitleChange(
                                                            "lesson",
                                                            modIndex,
                                                            chapIndex,
                                                            lessonIndex,
                                                            e.target.value
                                                          )
                                                        }
                                                        onBlur={() =>
                                                          setEditingIndex(null)
                                                        }
                                                        onKeyDown={(e) => {
                                                          if (e.key === "Enter")
                                                            setEditingIndex(
                                                              null
                                                            );
                                                        }}
                                                      />
                                                    ) : (
                                                      <span
                                                        className="title"
                                                        onClick={() =>
                                                          setEditingIndex({
                                                            type: "lesson",
                                                            index: lessonIndex,
                                                          })
                                                        }
                                                      >
                                                        {lesson.title}
                                                      </span>
                                                    )}
                                                  </div>
                                                  <div className="lesson-actions">
                                                    <button
                                                      className="file-btn"
                                                      onClick={() => {
                                                        console.log(
                                                          "Lesson file icon clicked - opening lesson popup"
                                                        );
                                                        openPopup(
                                                          "lesson",
                                                          modIndex,
                                                          chapIndex,
                                                          lessonIndex
                                                        );
                                                      }}
                                                    >
                                                      <svg
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="#333"
                                                        strokeWidth="2.5"
                                                      >
                                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                        <polyline points="14 2 14 8 20 8" />
                                                      </svg>
                                                    </button>
                                                    <button
                                                      className="close-btn"
                                                      onClick={() =>
                                                        removeLesson(
                                                          modIndex,
                                                          chapIndex,
                                                          lessonIndex
                                                        )
                                                      }
                                                    >
                                                      <svg
                                                        width="12"
                                                        height="12"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="#333"
                                                        strokeWidth="2.5"
                                                      >
                                                        <line
                                                          x1="18"
                                                          y1="6"
                                                          x2="6"
                                                          y2="18"
                                                        />
                                                        <line
                                                          x1="6"
                                                          y1="6"
                                                          x2="18"
                                                          y2="18"
                                                        />
                                                      </svg>
                                                    </button>
                                                  </div>
                                                </div>
                                                <button
                                                  className="quiz-btn"
                                                  onClick={openQuizPopup}
                                                >
                                                  <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="#333"
                                                    strokeWidth="2.5"
                                                  >
                                                    <path d="M9 12l2 2 4-4" />
                                                    <path d="M12 2a10 10 0 1 0 10 10" />
                                                    <path d="M12 6v6l4 2" />
                                                    <circle
                                                      cx="12"
                                                      cy="12"
                                                      r="3"
                                                      fill="#333"
                                                    />
                                                    <path d="M12 1v6" />
                                                    <path d="M12 17v6" />
                                                  </svg>
                                                </button>
                                                <button
                                                  className="add-lesson-btn"
                                                  onClick={() =>
                                                    addLesson(
                                                      modIndex,
                                                      chapIndex
                                                    )
                                                  }
                                                >
                                                  <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="#333"
                                                    strokeWidth="2.5"
                                                  >
                                                    <circle
                                                      cx="12"
                                                      cy="12"
                                                      r="10"
                                                    />
                                                    <line
                                                      x1="12"
                                                      y1="8"
                                                      x2="12"
                                                      y2="16"
                                                    />
                                                    <line
                                                      x1="8"
                                                      y1="12"
                                                      x2="16"
                                                      y2="12"
                                                    />
                                                  </svg>
                                                </button>
                                              </div>
                                            )
                                          )}
                                        </>
                                      ) : (
                                        <div className="lesson-row-with-add">
                                          <div className="lesson-row">
                                            <span className="lesson-icon">
                                              <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#333"
                                                strokeWidth="2.5"
                                              >
                                                <polygon points="5 3 19 12 5 21 5 3" />
                                              </svg>
                                            </span>
                                            <div className="title-container">
                                              <span className="title">
                                                Lesson 1
                                              </span>
                                            </div>
                                            <div className="lesson-actions">
                                              <button
                                                className="file-btn"
                                                onClick={() => {
                                                  addLesson(
                                                    modIndex,
                                                    chapIndex
                                                  );
                                                }}
                                              >
                                                <svg
                                                  width="16"
                                                  height="16"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="#333"
                                                  strokeWidth="2.5"
                                                >
                                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                  <polyline points="14 2 14 8 20 8" />
                                                </svg>
                                              </button>
                                            </div>
                                          </div>
                                          <button
                                            className="quiz-btn"
                                            onClick={openQuizPopup}
                                          >
                                            <svg
                                              width="18"
                                              height="18"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="#333"
                                              strokeWidth="2.5"
                                            >
                                              <path d="M9 12l2 2 4-4" />
                                              <path d="M12 2a10 10 0 1 0 10 10" />
                                              <path d="M12 6v6l4 2" />
                                              <circle
                                                cx="12"
                                                cy="12"
                                                r="3"
                                                fill="#333"
                                              />
                                              <path d="M12 1v6" />
                                              <path d="M12 17v6" />
                                            </svg>
                                          </button>
                                          <button
                                            className="add-lesson-btn"
                                            onClick={() =>
                                              addLesson(modIndex, chapIndex)
                                            }
                                          >
                                            <svg
                                              width="18"
                                              height="18"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="#333"
                                              strokeWidth="2.5"
                                            >
                                              <circle cx="12" cy="12" r="10" />
                                              <line
                                                x1="12"
                                                y1="8"
                                                x2="12"
                                                y2="16"
                                              />
                                              <line
                                                x1="8"
                                                y1="12"
                                                x2="16"
                                                y2="12"
                                              />
                                            </svg>
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                // Chapter collapsed
                                <div className="chapter-row">
                                  <button
                                    className="toggle-btn"
                                    onClick={() => toggleChapter(chapIndex)}
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="#333"
                                      strokeWidth="2.5"
                                    >
                                      <path d="M6 9l6 6 6-6" />
                                    </svg>
                                  </button>
                                  <span className="chapter-icon">
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="#333"
                                      strokeWidth="2.5"
                                    >
                                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                    </svg>
                                  </span>
                                  <div className="title-container">
                                    {editingIndex?.type === "chapter" &&
                                    editingIndex.index === chapIndex ? (
                                      <input
                                        className="title-input"
                                        value={chapter.title}
                                        autoFocus
                                        onChange={(e) =>
                                          handleTitleChange(
                                            "chapter",
                                            modIndex,
                                            chapIndex,
                                            undefined,
                                            e.target.value
                                          )
                                        }
                                        onBlur={() => setEditingIndex(null)}
                                        onKeyDown={(e) => {
                                          if (e.key === "Enter")
                                            setEditingIndex(null);
                                        }}
                                      />
                                    ) : (
                                      <span
                                        className="title"
                                        onClick={() =>
                                          setEditingIndex({
                                            type: "chapter",
                                            index: chapIndex,
                                          })
                                        }
                                      >
                                        {chapter.title}
                                      </span>
                                    )}
                                  </div>
                                  <div className="chapter-actions">
                                    <button
                                      className="file-btn"
                                      onClick={() => {
                                        console.log(
                                          "Chapter file icon clicked - expanding chapter"
                                        );
                                        setExpandedItems((prev) => ({
                                          ...prev,
                                          chapter: chapIndex,
                                        }));
                                        // If no lessons exist, add a default lesson
                                        if (chapter.lessons.length === 0) {
                                          addLesson(modIndex, chapIndex);
                                        }
                                      }}
                                    >
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#333"
                                        strokeWidth="2.5"
                                      >
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                      </svg>
                                    </button>
                                    <button
                                      className="close-btn"
                                      onClick={() =>
                                        removeChapter(modIndex, chapIndex)
                                      }
                                    >
                                      <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#333"
                                        strokeWidth="2.5"
                                      >
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Save button inside the grey area */}
                        <div className="save-button-container">
                          <button
                            className="save-module-btn"
                            onClick={() => saveModule(modIndex)}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Show collapsed module row
                    <div className="module-container">
                      <div className="module-row">
                        <button
                          className="toggle-btn"
                          onClick={() => toggleModule(modIndex)}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#333"
                            strokeWidth="2.5"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </button>
                        <span className="module-icon">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#333"
                            strokeWidth="2.5"
                          >
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                          </svg>
                        </span>
                        <div className="title-container">
                          {editingIndex?.type === "module" &&
                          editingIndex.index === modIndex ? (
                            <input
                              className="title-input"
                              type="text"
                              value={mod.title}
                              onChange={(e) =>
                                handleTitleChange(
                                  "module",
                                  modIndex,
                                  undefined,
                                  undefined,
                                  e.target.value
                                )
                              }
                              onBlur={() => setEditingIndex(null)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") setEditingIndex(null);
                              }}
                            />
                          ) : (
                            <h3
                              onClick={() =>
                                setEditingIndex({
                                  type: "module",
                                  index: modIndex,
                                })
                              }
                            >
                              {mod.title}
                            </h3>
                          )}
                        </div>
                        <div className="module-actions">
                          <button
                            className="file-btn"
                            onClick={() => openPopup("module", modIndex)}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#333"
                              strokeWidth="2.5"
                            >
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                            </svg>
                          </button>
                          <button
                            className="close-btn"
                            onClick={() => removeModule(modIndex)}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#333"
                              strokeWidth="2.5"
                            >
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="external-actions">
                        <button
                          className="assignment-btn"
                          onClick={openAssignmentPopup}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#333"
                            strokeWidth="2.5"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                          </svg>
                        </button>
                        <button
                          className="add-chapter-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log(
                              `Collapsed view: Adding chapter to module ${modIndex}`
                            );

                            // Add chapter
                            addChapter(modIndex, "collapsed-view");

                            // Expand module after a longer delay
                            setTimeout(() => {
                              setExpandedItems({
                                module: modIndex,
                                chapter: null,
                              });
                            }, 200); // Increased delay
                          }}
                        >
                          + Chapter
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Summary view (no frame)
          <div className="saved-modules-container">
            <h3>Summary</h3>
            <div className="saved-modules-table">
              {savedModules.map((module, moduleIndex) => (
                <div key={moduleIndex}>
                  <div className="saved-module-row">
                    <div className="module-column">Module : {module.id}</div>
                    <div className="details-column">
                      Contains : (Chapters : {module.chapters.length}, Lessons :{" "}
                      {module.chapters.reduce(
                        (acc: number, chap: any) => acc + chap.lessons.length,
                        0
                      )}
                      , Quiz : {module.quizzes?.length || 0}, Assignment :{" "}
                      {module.assignments?.length || 0})
                    </div>
                    <div className="actions-column">
                      <button
                        className="edit-module-btn"
                        onClick={() => openPopup("module", moduleIndex)}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        className="delete-module-btn"
                        onClick={() =>
                          confirmDelete("module", module, moduleIndex)
                        }
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                      <button
                        className="expand-module-btn"
                        onClick={() => toggleSummaryModule(moduleIndex)}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline
                            points={
                              expandedSummaryModules.has(moduleIndex)
                                ? "18 15 12 9 6 15"
                                : "6 9 12 15 18 9"
                            }
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Expanded module content */}
                  {expandedSummaryModules.has(moduleIndex) && (
                    <div className="expanded-module-content">
                      {module.chapters.map(
                        (chapter: any, chapterIndex: number) => (
                          <div key={chapterIndex}>
                            <div className="saved-chapter-row">
                              <div className="chapter-column">
                                Chapter : {chapterIndex + 1}
                              </div>
                              <div className="details-column">
                                Contains : (Lessons : {chapter.lessons.length},
                                Quiz : 12, Assignment : 2)
                              </div>
                              <div className="actions-column">
                                <button
                                  className="edit-module-btn"
                                  onClick={() =>
                                    openPopup(
                                      "chapter",
                                      moduleIndex,
                                      chapterIndex
                                    )
                                  }
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                  </svg>
                                </button>
                                <button
                                  className="delete-module-btn"
                                  onClick={() =>
                                    confirmDelete(
                                      "chapter",
                                      chapter,
                                      moduleIndex,
                                      chapterIndex
                                    )
                                  }
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  </svg>
                                </button>
                                <button
                                  className="expand-module-btn"
                                  onClick={() =>
                                    toggleSummaryChapter(
                                      moduleIndex,
                                      chapterIndex
                                    )
                                  }
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <polyline
                                      points={
                                        expandedSummaryChapters.has(
                                          `${moduleIndex}-${chapterIndex}`
                                        )
                                          ? "18 15 12 9 6 15"
                                          : "6 9 12 15 18 9"
                                      }
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>

                            {/* Expanded chapter content */}
                            {expandedSummaryChapters.has(
                              `${moduleIndex}-${chapterIndex}`
                            ) && (
                              <div className="expanded-chapter-content">
                                <div className="chapter-tabs">
                                  <button
                                    className={`tab-btn ${
                                      activeChapterTab[
                                        `${moduleIndex}-${chapterIndex}`
                                      ] === "lessons"
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      setChapterTab(
                                        moduleIndex,
                                        chapterIndex,
                                        "lessons"
                                      )
                                    }
                                  >
                                    Lessons
                                  </button>
                                  <button
                                    className={`tab-btn ${
                                      activeChapterTab[
                                        `${moduleIndex}-${chapterIndex}`
                                      ] === "quizzes"
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      setChapterTab(
                                        moduleIndex,
                                        chapterIndex,
                                        "quizzes"
                                      )
                                    }
                                  >
                                    Quizzes
                                  </button>
                                  <button
                                    className={`tab-btn ${
                                      activeChapterTab[
                                        `${moduleIndex}-${chapterIndex}`
                                      ] === "assignments"
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      setChapterTab(
                                        moduleIndex,
                                        chapterIndex,
                                        "assignments"
                                      )
                                    }
                                  >
                                    Assignments
                                  </button>
                                </div>

                                <div className="tab-content">
                                  {activeChapterTab[
                                    `${moduleIndex}-${chapterIndex}`
                                  ] === "lessons" && (
                                    <div className="lessons-list">
                                      {chapter.lessons.map(
                                        (lesson: any, lessonIndex: number) => (
                                          <div
                                            key={lessonIndex}
                                            className="lesson-item-row"
                                          >
                                            <div className="lesson-column">
                                              Lesson : {lessonIndex + 1}
                                            </div>
                                            <div className="lesson-title-column">
                                              {lesson.title}
                                            </div>
                                            <div className="actions-column">
                                              <button
                                                className="edit-module-btn"
                                                onClick={() =>
                                                  openPopup(
                                                    "lesson",
                                                    moduleIndex,
                                                    chapterIndex,
                                                    lessonIndex
                                                  )
                                                }
                                              >
                                                <svg
                                                  width="16"
                                                  height="16"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                >
                                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                </svg>
                                              </button>
                                              <button
                                                className="delete-module-btn"
                                                onClick={() =>
                                                  confirmDelete(
                                                    "lesson",
                                                    lesson,
                                                    moduleIndex,
                                                    chapterIndex,
                                                    lessonIndex
                                                  )
                                                }
                                              >
                                                <svg
                                                  width="16"
                                                  height="16"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                >
                                                  <polyline points="3 6 5 6 21 6" />
                                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                </svg>
                                              </button>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}

                                  {activeChapterTab[
                                    `${moduleIndex}-${chapterIndex}`
                                  ] === "quizzes" && (
                                    <div className="quizzes-list">
                                      {module.quizzes.map(
                                        (quiz: any, quizIndex: number) => (
                                          <div
                                            key={quizIndex}
                                            className="lesson-item-row"
                                          >
                                            <div className="lesson-column">
                                              Quiz : {quizIndex + 1}
                                            </div>
                                            <div className="lesson-title-column">
                                              {quiz.title}
                                            </div>
                                            <div className="actions-column">
                                              <button
                                                className="edit-module-btn"
                                                onClick={() => {
                                                  // Set the quiz data and open quiz popup
                                                  const quiz =
                                                    module.quizzes[quizIndex];
                                                  setQuizData({
                                                    title: quiz.title || "",
                                                    description:
                                                      quiz.description || "",
                                                    dueDate: quiz.dueDate || "",
                                                    timeLimit:
                                                      quiz.timeLimit ||
                                                      "1 Minute",
                                                    attempts:
                                                      quiz.attempts || "1",
                                                    questions:
                                                      quiz.questions || [],
                                                    shuffleQuestions:
                                                      quiz.shuffleQuestions ||
                                                      false,
                                                    shuffleAnswers:
                                                      quiz.shuffleAnswers ||
                                                      false,
                                                  });
                                                  openQuizPopup();
                                                }}
                                              >
                                                <svg
                                                  width="16"
                                                  height="16"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                >
                                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                </svg>
                                              </button>
                                              <button
                                                className="delete-module-btn"
                                                onClick={() =>
                                                  confirmDelete(
                                                    "quiz",
                                                    quiz,
                                                    moduleIndex,
                                                    undefined,
                                                    undefined,
                                                    quizIndex
                                                  )
                                                }
                                              >
                                                <svg
                                                  width="16"
                                                  height="16"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                >
                                                  <polyline points="3 6 5 6 21 6" />
                                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                </svg>
                                              </button>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}

                                  {activeChapterTab[
                                    `${moduleIndex}-${chapterIndex}`
                                  ] === "assignments" && (
                                    <div className="assignments-list">
                                      {module.assignments.map(
                                        (
                                          assignment: any,
                                          assignmentIndex: number
                                        ) => (
                                          <div
                                            key={assignmentIndex}
                                            className="lesson-item-row"
                                          >
                                            <div className="lesson-column">
                                              Assignment : {assignmentIndex + 1}
                                            </div>
                                            <div className="lesson-title-column">
                                              {assignment.title}
                                            </div>
                                            <div className="actions-column">
                                              <button
                                                className="edit-module-btn"
                                                onClick={() => {
                                                  // Set the assignment data and open assignment popup
                                                  const assignment =
                                                    module.assignments[
                                                      assignmentIndex
                                                    ];
                                                  setAssignmentData({
                                                    title:
                                                      assignment.title || "",
                                                    description:
                                                      assignment.description ||
                                                      "",
                                                    submissionMethod:
                                                      assignment.submissionMethod ||
                                                      "Online",
                                                    dueDate:
                                                      assignment.dueDate || "",
                                                    allowedFormats:
                                                      assignment.allowedFormats ||
                                                      "PDF, Word, Excel, JPEG",
                                                    allowCollaboration:
                                                      assignment.allowCollaboration ||
                                                      false,
                                                    notifyBeforeDue:
                                                      assignment.notifyBeforeDue ||
                                                      false,
                                                  });
                                                  openAssignmentPopup();
                                                }}
                                              >
                                                <svg
                                                  width="16"
                                                  height="16"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                >
                                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                </svg>
                                              </button>
                                              <button
                                                className="delete-module-btn"
                                                onClick={() =>
                                                  confirmDelete(
                                                    "assignment",
                                                    assignment,
                                                    moduleIndex,
                                                    undefined,
                                                    undefined,
                                                    assignmentIndex
                                                  )
                                                }
                                              >
                                                <svg
                                                  width="16"
                                                  height="16"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                >
                                                  <polyline points="3 6 5 6 21 6" />
                                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                </svg>
                                              </button>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* All the popup components - moved outside the main container */}
      {/* Regular Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-redesigned">
            <div className="popup-header">
              <div className="popup-tabs-redesigned">
                <button
                  className={`${activeTab === "description" ? "active" : ""}`}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </button>
                <button
                  className={`${activeTab === "videos" ? "active" : ""}`}
                  onClick={() => setActiveTab("videos")}
                >
                  Introductory Video
                </button>
                <button
                  className={`${activeTab === "files" ? "active" : ""}`}
                  onClick={() => setActiveTab("files")}
                >
                  Case Studies
                </button>
              </div>
              <button className="close-popup-btn" onClick={closePopup}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="popup-content-redesigned">
              {activeTab === "description" && (
                <div className="description-content">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description..."
                  />
                </div>
              )}

              {activeTab === "videos" && (
                <div className="videos-content-layout">
                  <div className="upload-section-left">
                    <h3>Upload Video</h3>
                    <div
                      className="upload-zone-redesigned"
                      onClick={() => videoInputRef.current?.click()}
                    >
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <p>Upload MP4,MPEG</p>
                    </div>
                    <small>Maximum upload size limit of 100 MB</small>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      ref={videoInputRef}
                      style={{ display: "none" }}
                    />
                  </div>

                  <div className="preview-section-right">
                    {videoPreview ? (
                      <div className="video-player-container">
                        <video className="video-player" controls ref={videoRef}>
                          <source src={videoPreview} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ) : (
                      <div className="video-placeholder">
                        <div className="placeholder-content">
                          <div className="play-button-large">
                            <svg
                              width="64"
                              height="64"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                          </div>
                          <div className="video-controls-placeholder">
                            <div className="control-bar">
                              <div className="control-buttons">
                                <div className="control-btn"></div>
                                <div className="control-btn"></div>
                                <div className="control-btn"></div>
                                <div className="control-btn"></div>
                              </div>
                              <div className="progress-bar"></div>
                              <span className="time-display">01:07:03:18</span>
                              <div className="volume-controls">
                                <div className="control-btn"></div>
                                <div className="control-btn"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "files" && (
                <div className="files-content-layout">
                  <div className="upload-section-left">
                    <h3>Upload Files</h3>
                    <div
                      className="upload-zone-redesigned"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <p>Upload PDF, Word</p>
                    </div>
                    <small>Maximum upload size limit of 30 MB</small>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      ref={fileInputRef}
                      style={{ display: "none" }}
                    />
                  </div>

                  <div className="files-list-section">
                    <h3>Uploaded Files</h3>
                    {getCurrentFiles().map((file, index) => (
                      <div key={index} className="case-file-item">
                        <div className="case-file-info">
                          <span className="case-file-name">
                            Case File : {index + 1}
                          </span>
                          <div className="case-file-actions">
                            <button
                              className="view-btn"
                              onClick={() => viewFile(file)}
                            >
                              View
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() => deleteFile(index)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="preview-section-right">
                    {selectedFile ? (
                      <div className="file-preview-container">
                        <div className="file-preview-header">
                          <span>{selectedFile.name}</span>
                          <div style={{ display: "flex", gap: "10px" }}>
                            {selectedFile.url && (
                              <a
                                href={selectedFile.url}
                                download={selectedFile.name}
                                className="fullscreen-btn"
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                }}
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                  <polyline points="7 10 12 15 17 10" />
                                  <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                              </a>
                            )}
                            <button
                              onClick={toggleFullScreen}
                              className="fullscreen-btn"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="file-preview-content">
                          {selectedFile.type === "pdf" ? (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%",
                                padding: "20px",
                                textAlign: "center",
                              }}
                            >
                              <svg
                                width="64"
                                height="64"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                style={{
                                  marginBottom: "20px",
                                  color: "#e74c3c",
                                }}
                              >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                              </svg>
                              <h3
                                style={{ margin: "0 0 10px 0", color: "#333" }}
                              >
                                PDF Document
                              </h3>
                              <p
                                style={{ margin: "0 0 20px 0", color: "#666" }}
                              >
                                {selectedFile.name}
                              </p>
                              <p
                                style={{
                                  margin: "0",
                                  color: "#999",
                                  fontSize: "14px",
                                }}
                              >
                                Click the fullscreen button above to view this
                                PDF document, or use the download button to save
                                it to your device.
                              </p>
                            </div>
                          ) : (
                            <div className="file-text-content">
                              <pre
                                style={{
                                  whiteSpace: "pre-wrap",
                                  fontFamily: "inherit",
                                }}
                              >
                                {selectedFile.content}
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="file-placeholder">
                        <div className="file-preview-header">
                          <span>Case File : 1</span>
                        </div>
                        <div className="placeholder-text">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum. It is a long established fact that a
                            reader will be distracted by the readable content of
                            a page when looking at its layout. The point of
                            using Lorem Ipsum is that it has a more-or-less
                            normal distribution of letters, as opposed to using
                            'Content here, content here', making it look like
                            readable English. Many desktop publishing packages
                            and web page editors now use Lorem Ipsum as their
                            default model text, and a search for 'lorem ipsum'
                            will uncover many web sites still in their infancy.
                            Various versions have evolved over the years,
                            sometimes by accident, sometimes on purpose
                            (injected humour and the like).
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {authorMode === "individual" && (
                <div className="author-dropdown-popup">
                  <label>Author</label>
                  <select
                    value={selectedAuthor}
                    onChange={(e) => setSelectedAuthor(e.target.value)}
                  >
                    <option value="">Select Author</option>
                    {authors.map((author, index) => (
                      <option key={index} value={author}>
                        {author}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="popup-actions-redesigned">
              <button className="ok-btn" onClick={saveContent}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {showLessonPopup && (
        <div className="popup-overlay">
          <div className="lesson-popup">
            <div className="lesson-popup-header">
              <div className="lesson-popup-tabs">
                <button
                  className={lessonActiveTab === "flipbook" ? "active" : ""}
                  onClick={() => setLessonActiveTab("flipbook")}
                >
                  Flipbook
                </button>
                <button
                  className={lessonActiveTab === "videos" ? "active" : ""}
                  onClick={() => setLessonActiveTab("videos")}
                >
                  Video Files
                </button>
              </div>
              <button className="close-popup-btn" onClick={closeLessonPopup}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="lesson-popup-content">
              {lessonActiveTab === "flipbook" && (
                <div
                  className="flipbook-content"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <FlipBookUploader />
                </div>
              )}

              {lessonActiveTab === "videos" && (
                <div className="video-files-content">
                  <div className="video-upload-section">
                    <h3>Upload Files</h3>
                    <div
                      className="video-upload-zone"
                      onClick={() => lessonVideoInputRef.current?.click()}
                    >
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <p>Upload MP4, MPEG</p>
                      <small>Maximum upload size limit of 100 MB</small>
                    </div>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleLessonVideoUpload}
                      ref={lessonVideoInputRef}
                      style={{ display: "none" }}
                    />

                    <div className="lesson-duration">
                      <h4>Lesson Duration</h4>
                      <div className="duration-inputs">
                        <input
                          type="text"
                          placeholder="Hours"
                          value={lessonDuration.hours}
                          onChange={(e) =>
                            setLessonDuration((prev) => ({
                              ...prev,
                              hours: e.target.value,
                            }))
                          }
                        />
                        <input
                          type="text"
                          placeholder="Mins"
                          value={lessonDuration.mins}
                          onChange={(e) =>
                            setLessonDuration((prev) => ({
                              ...prev,
                              mins: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>

                    <button
                      className="video-save-btn"
                      onClick={saveLessonContent}
                    >
                      Save
                    </button>
                  </div>

                  <div className="video-preview-section">
                    <h3>Preview</h3>
                    <div className="video-preview-container">
                      {getCurrentLessonVideos().length > 0 ? (
                        <div className="uploaded-videos-list">
                          {getCurrentLessonVideos().map((video, index) => (
                            <div key={index} className="video-preview-item">
                              <video
                                className="preview-video-player"
                                controls
                                style={{
                                  width: "100%",
                                  height: "200px",
                                  objectFit: "contain",
                                  backgroundColor: "#000",
                                  borderRadius: "8px",
                                  cursor: "pointer",
                                }}
                                onLoadedMetadata={(e) => {
                                  const videoElement =
                                    e.target as HTMLVideoElement;
                                  const hours =
                                    Number.parseInt(lessonDuration.hours) || 0;
                                  const mins =
                                    Number.parseInt(lessonDuration.mins) || 0;
                                  const totalDurationInSeconds =
                                    hours * 3600 + mins * 60;

                                  if (totalDurationInSeconds > 0) {
                                    // Add time update listener to stop at specified duration
                                    const handleTimeUpdate = () => {
                                      if (
                                        videoElement.currentTime >=
                                        totalDurationInSeconds
                                      ) {
                                        videoElement.pause();
                                        videoElement.currentTime =
                                          totalDurationInSeconds;
                                      }
                                    };

                                    videoElement.addEventListener(
                                      "timeupdate",
                                      handleTimeUpdate
                                    );

                                    // Clean up listener when component unmounts or video changes
                                    videoElement.addEventListener(
                                      "loadstart",
                                      () => {
                                        videoElement.removeEventListener(
                                          "timeupdate",
                                          handleTimeUpdate
                                        );
                                      }
                                    );
                                  }
                                }}
                                onClick={() => {
                                  // Play video in fullscreen for specified duration
                                  const hours =
                                    Number.parseInt(lessonDuration.hours) || 0;
                                  const mins =
                                    Number.parseInt(lessonDuration.mins) || 0;
                                  const totalDurationInSeconds =
                                    hours * 3600 + mins * 60;

                                  // Create fullscreen video player
                                  const videoElement =
                                    document.createElement("video");
                                  videoElement.src = video.url;
                                  videoElement.controls = true;
                                  videoElement.style.cssText = `
                                    position: fixed;
                                    top: 0;
                                    left: 0;
                                    width: 100vw;
                                    height: 100vh;
                                    background: black;
                                    z-index: 9999;
                                    object-fit: contain;
                                  `;

                                  // Add close button
                                  const closeBtn =
                                    document.createElement("button");
                                  closeBtn.innerHTML = "×";
                                  closeBtn.style.cssText = `
                                    position: fixed;
                                    top: 20px;
                                    right: 20px;
                                    background: rgba(0,0,0,0.7);
                                    color: white;
                                    border: none;
                                    font-size: 30px;
                                    width: 50px;
                                    height: 50px;
                                    border-radius: 50%;
                                    cursor: pointer;
                                    z-index: 10000;
                                  `;

                                  const cleanup = () => {
                                    if (document.body.contains(videoElement)) {
                                      videoElement.pause();
                                      document.body.removeChild(videoElement);
                                    }
                                    if (document.body.contains(closeBtn)) {
                                      document.body.removeChild(closeBtn);
                                    }
                                  };

                                  closeBtn.onclick = cleanup;

                                  // If duration is set, auto close after specified duration
                                  if (totalDurationInSeconds > 0) {
                                    videoElement.addEventListener(
                                      "loadedmetadata",
                                      () => {
                                        // Set the video to stop at the specified duration
                                        videoElement.addEventListener(
                                          "timeupdate",
                                          () => {
                                            if (
                                              videoElement.currentTime >=
                                              totalDurationInSeconds
                                            ) {
                                              videoElement.pause();
                                              cleanup();
                                            }
                                          }
                                        );

                                        // Also set a backup timer
                                        setTimeout(() => {
                                          cleanup();
                                        }, totalDurationInSeconds * 1000);
                                      }
                                    );
                                  }

                                  // Cleanup on video end
                                  videoElement.addEventListener(
                                    "ended",
                                    cleanup
                                  );

                                  document.body.appendChild(videoElement);
                                  document.body.appendChild(closeBtn);
                                  videoElement.play().catch(console.error);
                                }}
                              >
                                <source src={video.url} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                              <div className="video-info">
                                <div className="video-name">{video.name}</div>
                                <div className="video-duration">
                                  Duration: {lessonDuration.hours || "0"}h{" "}
                                  {lessonDuration.mins || "0"}m
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="video-placeholder">
                          <div className="placeholder-image">
                            <svg
                              width="100"
                              height="100"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                            >
                              <rect
                                x="2"
                                y="3"
                                width="20"
                                height="14"
                                rx="2"
                                ry="2"
                              />
                              <line x1="8" y1="21" x2="16" y2="21" />
                              <line x1="12" y1="17" x2="12" y2="21" />
                            </svg>
                            <p>No video uploaded</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="lesson-popup-actions">
              {authorMode === "individual" && (
                <div className="author-dropdown-popup-left">
                  <label>Author</label>
                  <select
                    value={selectedAuthor}
                    onChange={(e) => setSelectedAuthor(e.target.value)}
                  >
                    <option value="">Select Author</option>
                    {authors.map((author, index) => (
                      <option key={index} value={author}>
                        {author}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Assignment Popup */}
      {showAssignmentPopup && (
        <div className="popup-overlay">
          <div className="assignment-popup">
            <div className="assignment-header">
              <h2>Assignment</h2>
              <button
                className="close-popup-btn"
                onClick={closeAssignmentPopup}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <hr />
            </div>

            <div className="assignment-content">
              <div className="assignment-form-row">
                <div className="assignment-form-group">
                  <label>
                    Assignment Title<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    value={assignmentData.title}
                    onChange={(e) =>
                      setAssignmentData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="assignment-form-group">
                  <label>
                    Submission Method<span className="required">*</span>
                  </label>
                  <select
                    value={assignmentData.submissionMethod}
                    onChange={(e) =>
                      setAssignmentData((prev) => ({
                        ...prev,
                        submissionMethod: e.target.value,
                      }))
                    }
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>
              </div>

              <div className="assignment-main-content">
                <div className="assignment-left-section">
                  <div className="assignment-form-group">
                    <label>
                      Description<span className="required">*</span>
                    </label>
                    <textarea
                      value={assignmentData.description}
                      onChange={(e) =>
                        setAssignmentData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows={4}
                    />
                  </div>

                  <div className="assignment-file-upload">
                    <label>Assignment Files</label>
                    <div
                      className="assignment-upload-zone"
                      onClick={() => assignmentFileInputRef.current?.click()}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <span>Upload PDF, Word, Excel, JPEG</span>
                    </div>
                    <input
                      type="file"
                      multiple
                      ref={assignmentFileInputRef}
                      style={{ display: "none" }}
                    />
                    <small>Maximum upload size limit of 30 MB</small>
                  </div>
                </div>

                <div className="assignment-right-section">
                  <div className="assignment-form-group">
                    <label>
                      Due Date<span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      value={assignmentData.dueDate}
                      onChange={(e) =>
                        setAssignmentData((prev) => ({
                          ...prev,
                          dueDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="assignment-form-group">
                    <label>
                      Allowed File Formats<span className="required">*</span>
                    </label>
                    <select
                      value={assignmentData.allowedFormats}
                      onChange={(e) =>
                        setAssignmentData((prev) => ({
                          ...prev,
                          allowedFormats: e.target.value,
                        }))
                      }
                    >
                      <option value="PDF, Word, Excel, JPEG">
                        PDF, Word, Excel, JPEG
                      </option>
                      <option value="PDF only">PDF only</option>
                      <option value="Word only">Word only</option>
                      <option value="Image files only">Image files only</option>
                    </select>
                  </div>

                  <div className="assignment-checkboxes">
                    <label className="assignment-checkbox-label">
                      <input
                        type="checkbox"
                        checked={assignmentData.allowCollaboration}
                        onChange={(e) =>
                          setAssignmentData((prev) => ({
                            ...prev,
                            allowCollaboration: e.target.checked,
                          }))
                        }
                      />
                      Allow students to ask questions or collaborate.
                    </label>
                    <label className="assignment-checkbox-label">
                      <input
                        type="checkbox"
                        checked={assignmentData.notifyBeforeDue}
                        onChange={(e) =>
                          setAssignmentData((prev) => ({
                            ...prev,
                            notifyBeforeDue: e.target.checked,
                          }))
                        }
                      />
                      Notify Student's before Due Date
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="assignment-actions">
              <button className="assignment-save-btn" onClick={saveAssignment}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Popup */}
      {showQuizPopup && (
        <div className="popup-overlay">
          <div className="quiz-popup">
            <div className="quiz-header">
              <h2>Quiz</h2>
              <button className="close-popup-btn" onClick={closeQuizPopup}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <hr />
            </div>

            <div className="quiz-content">
              <div className="quiz-details">
                <h3>Details</h3>
                <div className="quiz-form-row">
                  <div className="quiz-form-group">
                    <label>
                      Quiz Title<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      value={quizData.title}
                      onChange={(e) =>
                        setQuizData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="quiz-form-group">
                    <label>
                      Due Date<span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      value={quizData.dueDate}
                      onChange={(e) =>
                        setQuizData((prev) => ({
                          ...prev,
                          dueDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="quiz-form-row">
                  <div className="quiz-form-group quiz-description">
                    <label>
                      Description<span className="required">*</span>
                    </label>
                    <textarea
                      value={quizData.description}
                      onChange={(e) =>
                        setQuizData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows={4}
                    />
                  </div>
                  <div className="quiz-form-group-right">
                    <div className="quiz-form-group">
                      <label>
                        Time Limit<span className="required">*</span>
                      </label>
                      <select
                        value={quizData.timeLimit}
                        onChange={(e) =>
                          setQuizData((prev) => ({
                            ...prev,
                            timeLimit: e.target.value,
                          }))
                        }
                      >
                        <option value="1 Minute">1 Minute</option>
                        <option value="5 Minutes">5 Minutes</option>
                        <option value="10 Minutes">10 Minutes</option>
                        <option value="30 Minutes">30 Minutes</option>
                        <option value="1 Hour">1 Hour</option>
                      </select>
                    </div>
                    <div className="quiz-form-group">
                      <label>
                        Number of Attempts<span className="required">*</span>
                      </label>
                      <select
                        value={quizData.attempts}
                        onChange={(e) =>
                          setQuizData((prev) => ({
                            ...prev,
                            attempts: e.target.value,
                          }))
                        }
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="Unlimited">Unlimited</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="quiz-questions">
                <div className="quiz-questions-header">
                  <h3>Questions</h3>
                  <button
                    className="quiz-add-question-btn"
                    onClick={() => setShowQuestionForm(true)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                    Add Question
                  </button>
                </div>

                <div className="quiz-questions-list">
                  {quizData.questions.map((question, index) => (
                    <div key={question.id} className="quiz-question-item">
                      <div className="quiz-question-header">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="question-drag-icon"
                        >
                          <line x1="3" y1="6" x2="21" y2="6" />
                          <line x1="3" y1="12" x2="21" y2="12" />
                          <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                        <span className="quiz-question-number">
                          Question {index + 1}
                        </span>
                        <span className="quiz-question-text">
                          {question.question}
                        </span>
                        <div className="quiz-question-actions">
                          <button
                            className="quiz-edit-btn"
                            onClick={() => setEditingQuestion(question.id)}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>
                          <button
                            className="quiz-delete-btn"
                            onClick={() => removeQuestion(question.id)}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {showQuestionForm && (
                  <div className="quiz-question-form">
                    <div className="quiz-form-group">
                      <label>Question</label>
                      <input
                        type="text"
                        value={currentQuestion.question}
                        onChange={(e) =>
                          setCurrentQuestion((prev) => ({
                            ...prev,
                            question: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="quiz-form-group">
                      <label>
                        Answers{" "}
                        <span className="mark-correct">
                          (Mark the correct answer with radio button)
                        </span>
                      </label>
                      <div className="quiz-answers-list">
                        {currentQuestion.answers.map((answer, index) => (
                          <div key={index} className="quiz-answer-item">
                            <input
                              type="radio"
                              name="correctAnswer"
                              checked={currentQuestion.correctAnswer === index}
                              onChange={() =>
                                setCurrentQuestion((prev) => ({
                                  ...prev,
                                  correctAnswer: index,
                                }))
                              }
                            />
                            <input
                              type="text"
                              value={answer}
                              onChange={(e) => {
                                const newAnswers = [...currentQuestion.answers];
                                newAnswers[index] = e.target.value;
                                setCurrentQuestion((prev) => ({
                                  ...prev,
                                  answers: newAnswers,
                                }));
                              }}
                            />
                            {index > 1 && (
                              <button
                                className="quiz-remove-answer-btn"
                                onClick={() => {
                                  const newAnswers =
                                    currentQuestion.answers.filter(
                                      (_, i) => i !== index
                                    );
                                  setCurrentQuestion((prev) => ({
                                    ...prev,
                                    answers: newAnswers,
                                    correctAnswer:
                                      prev.correctAnswer > index
                                        ? prev.correctAnswer - 1
                                        : prev.correctAnswer,
                                  }));
                                }}
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <line x1="18" y1="6" x2="6" y2="18" />
                                  <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="quiz-edit-actions">
                      <button
                        className="quiz-cancel-edit-btn"
                        onClick={() => setShowQuestionForm(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="quiz-add-question-yellow-btn"
                        onClick={addQuestionToList}
                      >
                        Add Question
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="quiz-settings">
                <h3>Quiz Settings</h3>
                <div className="quiz-toggle-group">
                  <label className="quiz-toggle-label">
                    <span>Shuffle Questions</span>
                    <div className="quiz-toggle-switch">
                      <input
                        type="checkbox"
                        checked={quizData.shuffleQuestions}
                        onChange={(e) =>
                          setQuizData((prev) => ({
                            ...prev,
                            shuffleQuestions: e.target.checked,
                          }))
                        }
                      />
                      <span className="quiz-slider"></span>
                    </div>
                  </label>
                  <label className="quiz-toggle-label">
                    <span>Shuffle Answers</span>
                    <div className="quiz-toggle-switch">
                      <input
                        type="checkbox"
                        checked={quizData.shuffleAnswers}
                        onChange={(e) =>
                          setQuizData((prev) => ({
                            ...prev,
                            shuffleAnswers: e.target.checked,
                          }))
                        }
                      />
                      <span className="quiz-slider"></span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="quiz-actions">
              <button className="quiz-cancel-btn" onClick={closeQuizPopup}>
                Cancel
              </button>
              <button className="quiz-save-btn" onClick={saveQuiz}>
                Create Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation popup */}
      {deleteConfirmation?.show && (
        <div className="popup-overlay">
          <div className="delete-confirmation-popup">
            <div className="delete-confirmation-content">
              <h3>Confirm Delete</h3>
              <div className="delete-item-info">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                <span>
                  {deleteConfirmation.type === "module" &&
                    `Module: ${
                      deleteConfirmation.item.title ||
                      deleteConfirmation.item.id
                    }`}
                  {deleteConfirmation.type === "chapter" &&
                    `Chapter: ${deleteConfirmation.item.title}`}
                  {deleteConfirmation.type === "lesson" &&
                    `Lesson: ${deleteConfirmation.item.title}`}
                  {deleteConfirmation.type === "quiz" &&
                    `Quiz: ${deleteConfirmation.item.title}`}
                  {deleteConfirmation.type === "assignment" &&
                    `Assignment: ${deleteConfirmation.item.title}`}
                </span>
              </div>
              <div className="delete-confirmation-actions">
                <button className="cancel-delete-btn" onClick={cancelDelete}>
                  Cancel
                </button>
                <button className="confirm-delete-btn" onClick={executeDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen file viewer */}
      {selectedFile && isFullScreen && (
        <div className="fullscreen-overlay">
          <div className="fullscreen-header">
            <h2>{selectedFile.name}</h2>
            <div style={{ display: "flex", gap: "10px" }}>
              {selectedFile.url && (
                <a
                  href={selectedFile.url}
                  download={selectedFile.name}
                  className="close-fullscreen-btn"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </a>
              )}
              <button
                className="close-fullscreen-btn"
                onClick={toggleFullScreen}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
          <div className="fullscreen-content">
            {selectedFile.type === "pdf" ? (
              <div
                className="pdf-fullscreen-container"
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {selectedFile.url ? (
                  <iframe
                    src={`${selectedFile.url}#toolbar=0&navpanes=0`}
                    style={{ width: "100%", height: "90%", border: "none" }}
                    title={selectedFile.name}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      padding: "40px",
                      textAlign: "center",
                    }}
                  >
                    <svg
                      width="128"
                      height="128"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      style={{ marginBottom: "30px", color: "#e74c3c" }}
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                    <h2 style={{ margin: "0 0 20px 0", color: "#333" }}>
                      PDF Document
                    </h2>
                    <p
                      style={{
                        margin: "0 0 30px 0",
                        color: "#666",
                        fontSize: "18px",
                      }}
                    >
                      {selectedFile.name}
                    </p>
                    <p
                      style={{
                        margin: "0 0 30px 0",
                        color: "#999",
                        fontSize: "16px",
                        maxWidth: "600px",
                      }}
                    >
                      This PDF document cannot be displayed directly in the
                      browser due to security restrictions. Please use the
                      download button above to save and view the file in your
                      preferred PDF viewer.
                    </p>
                    <a
                      href={selectedFile.url}
                      download={selectedFile.name}
                      style={{
                        display: "inline-block",
                        padding: "12px 24px",
                        backgroundColor: "#3498db",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      Download PDF
                    </a>
                  </div>
                )}
              </div>
            ) : selectedFile.type === "word" ||
              selectedFile.type === "docx" ||
              selectedFile.type === "doc" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  padding: "40px",
                  textAlign: "center",
                }}
              >
                <svg
                  width="128"
                  height="128"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2b579a"
                  strokeWidth="1"
                  style={{ marginBottom: "30px" }}
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <h2 style={{ margin: "0 0 20px 0", color: "#333" }}>
                  Word Document
                </h2>
                <p
                  style={{
                    margin: "0 0 30px 0",
                    color: "#666",
                    fontSize: "18px",
                  }}
                >
                  {selectedFile.name}
                </p>
                <p
                  style={{
                    margin: "0 0 30px 0",
                    color: "#999",
                    fontSize: "16px",
                    maxWidth: "600px",
                  }}
                >
                  This Word document cannot be displayed directly in the
                  browser. Please use the download button to save and view the
                  file in Microsoft Word or a compatible application.
                </p>
                <a
                  href={selectedFile.url}
                  download={selectedFile.name}
                  style={{
                    display: "inline-block",
                    padding: "12px 24px",
                    backgroundColor: "#2b579a",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "6px",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  Download Word Document
                </a>
              </div>
            ) : (
              <pre className="fullscreen-file-content">
                {selectedFile.content}
              </pre>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default CurriculumCourse;
