// Temporary file to store timeline activities data with proper touchpoint categories
const timelineActivities = [
  {
    ageInMonths: 0,
    date: "2021-05-15",
    type: "birth",
    touchpointCategory: "screening-assessment",
    title: "Birth",
    description: "Child birth and initial health assessment",
    status: "completed"
  },
  {
    ageInMonths: 30,
    date: "2023-11-15",
    type: "first-assessment",
    touchpointCategory: "screening-assessment",
    title: "First Carengrow Assessment",
    description: "Initial developmental screening and baseline assessment by Carengrow team",
    outcome: "Baseline developmental evaluation completed, some speech concerns noted",
    status: "completed",
    coordinator: "Dr. Rajesh Kumar"
  },
  {
    ageInMonths: 33,
    date: "2024-04-15",
    type: "screening",
    touchpointCategory: "screening-assessment",
    title: "Developmental Screening #1 - Month 33",
    description: "First comprehensive screening identifying delays in multiple domains",
    outcome: "Multiple developmental delays identified, intervention plan initiated",
    status: "completed",
    coordinator: "Dr. Rajesh Kumar"
  },
  {
    ageInMonths: 34,
    date: "2024-05-10",
    type: "whatsapp",
    touchpointCategory: "digital-whatsapp",
    title: "Initial WhatsApp Contact",
    description: "First digital outreach to parents with basic development tips and guidance",
    outcome: "Parent responded positively, expressed willingness to participate",
    status: "completed"
  },
  {
    ageInMonths: 34,
    date: "2024-05-20",
    type: "workshop",
    touchpointCategory: "workshops-awareness",
    title: "Parent Awareness Workshop: Child Development Basics",
    description: "Group workshop introducing parents to early childhood development concepts",
    outcome: "Parent attended and showed high engagement, asked relevant questions",
    status: "completed",
    coordinator: "Ms. Anjali Reddy"
  },
  {
    ageInMonths: 35,
    date: "2024-06-05",
    type: "home_visit",
    touchpointCategory: "home-visits",
    title: "Initial Home Assessment",
    description: "First home visit to assess environment and family dynamics for intervention planning",
    outcome: "Home environment suitable for interventions, family very cooperative",
    status: "completed",
    coordinator: "Ms. Meera Devi"
  },
  {
    ageInMonths: 35,
    date: "2024-06-15",
    type: "whatsapp",
    touchpointCategory: "digital-whatsapp",
    title: "Speech Development Tips",
    description: "Targeted messages with specific activities to improve language skills",
    outcome: "Parent implemented activities, reported child showing interest",
    status: "completed"
  },
  {
    ageInMonths: 36,
    date: "2024-07-15",
    type: "screening",
    touchpointCategory: "screening-assessment",
    title: "Developmental Screening #2 - Month 36",
    description: "Follow-up comprehensive developmental assessment after 3 months of interventions",
    outcome: "Significant improvement in motor skills, speech delays persist",
    status: "completed",
    coordinator: "Dr. Rajesh Kumar"
  },
  {
    ageInMonths: 36,
    date: "2024-07-20",
    type: "whatsapp",
    touchpointCategory: "digital-whatsapp",
    title: "Post-Screening Communication",
    description: "Sharing screening results and updated intervention plans with parents",
    outcome: "Parents understood results, committed to continuing interventions",
    status: "completed"
  },
  {
    ageInMonths: 36,
    date: "2024-07-25",
    type: "workshop",
    touchpointCategory: "workshops-awareness",
    title: "Parent Workshop: Early Language Stimulation",
    description: "Specialized workshop focusing on techniques to stimulate language development",
    outcome: "Parent actively participated and learned new intervention techniques",
    status: "completed",
    coordinator: "Ms. Anjali Reddy"
  },
  {
    ageInMonths: 37,
    date: "2024-08-02",
    type: "home_visit",
    touchpointCategory: "home-visits",
    title: "Home Visit - Activity Implementation",
    description: "Visit to guide parents on implementing recommended activities in home environment",
    outcome: "Good compliance with activities, additional resources provided",
    status: "completed",
    coordinator: "Ms. Meera Devi"
  },
  {
    ageInMonths: 37,
    date: "2024-08-10",
    type: "whatsapp",
    touchpointCategory: "digital-whatsapp",
    title: "Weekly Progress Check",
    description: "Regular follow-up message asking about child's progress and addressing concerns",
    outcome: "Parent reported improvement in vocabulary and motor skills",
    status: "completed"
  },
  {
    ageInMonths: 37,
    date: "2024-08-15",
    type: "intervention",
    touchpointCategory: "home-visits",
    title: "Speech Therapy Session #1",
    description: "Individual speech therapy session focusing on articulation and vocabulary building",
    outcome: "Child showed good engagement, homework activities assigned",
    status: "completed",
    coordinator: "Ms. Lakshmi Prasad"
  },
  {
    ageInMonths: 38,
    date: "2024-08-22",
    type: "home_visit",
    touchpointCategory: "home-visits",
    title: "Follow-up Home Visit",
    description: "Assessment of progress and reinforcement of intervention strategies",
    status: "scheduled",
    coordinator: "Ms. Meera Devi"
  },
  {
    ageInMonths: 38,
    date: "2024-09-01",
    type: "referral",
    touchpointCategory: "referral",
    title: "Specialist Referral - Speech Therapist",
    description: "Referral to government health center for intensive speech therapy evaluation",
    status: "scheduled",
    coordinator: "Dr. Rajesh Kumar"
  },
  {
    ageInMonths: 39,
    date: "2024-09-15",
    type: "screening",
    touchpointCategory: "screening-assessment",
    title: "Follow-up Screening #3",
    description: "Third developmental screening to assess progress after intensive interventions",
    status: "scheduled",
    coordinator: "Dr. Rajesh Kumar"
  }
];