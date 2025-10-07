"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Candidate } from "@/services/candidatesData";

interface CandidateCardProps {
  candidate: Candidate;
  index: number;
}

export default function CandidateCard({ candidate, index }: CandidateCardProps) {
  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500 border-green-500";
    if (score >= 60) return "text-yellow-500 border-yellow-500";
    if (score >= 40) return "text-orange-500 border-orange-500";
    return "text-red-500 border-red-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-300 group"
    >
      {/* Header with Avatar and Match Score */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16 ring-4 ring-white shadow-md">
            <AvatarImage src={candidate.avatar} alt={candidate.name} />
            <AvatarFallback className="bg-purple-100 text-purple-600 font-semibold text-lg">
              {candidate.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">
              {candidate.name}
            </h3>
            <p className="text-sm text-gray-600">
              {candidate.title} | {candidate.workType} | ${candidate.rate}/{candidate.rateType}
            </p>
          </div>
        </div>

        {/* Match Score Circle */}
        <div className={`relative w-14 h-14 flex items-center justify-center rounded-full border-4 ${getMatchScoreColor(candidate.matchScore)} bg-white shadow-md`}>
          <span className={`text-xl font-bold ${getMatchScoreColor(candidate.matchScore)}`}>
            {candidate.matchScore}
          </span>
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm text-gray-700 mb-4 line-clamp-2">
        {candidate.bio}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {candidate.skills.map((skill, idx) => (
          <Badge
            key={idx}
            variant="secondary"
            className="bg-white text-gray-700 border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors px-3 py-1"
          >
            {skill}
          </Badge>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <Button
          className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
        >
          Message
        </Button>
        <Button
          variant="outline"
          className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 font-semibold transition-all duration-200"
        >
          View Resume
        </Button>
      </div>
    </motion.div>
  );
}