"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function GmfmScoreSheet() {
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    id: "",
    dateOfBirth: "",
    chronologicalAge: "",
    assessmentDate: new Date().toISOString().split('T')[0],
    gmfcsLevel: "",
    evaluator: "",
    testingConditions: ""
  })

  const [scores, setScores] = useState({
    A1: "0", A2: "0", A3: "0", A4: "0", A5: "0", A6: "0", A7: "0", A8: "0", A9: "0",
    A10: "0", A11: "0", A12: "0", A13: "0", A14: "0", A15: "0", A16: "0", A17: "0",
    B18: "0", B19: "0", B20: "0", B21: "0", B22: "0", B23: "0", B24: "0", B25: "0",
    B26: "0", B27: "0", B28: "0", B29: "0", B30: "0", B31: "0", B32: "0", B33: "0",
    B34: "0", B35: "0", B36: "0", B37: "0",
    C38: "0", C39: "0", C40: "0", C41: "0", C42: "0", C43: "0", C44: "0", C45: "0",
    C46: "0", C47: "0", C48: "0", C49: "0", C50: "0", C51: "0",
    D52: "0", D53: "0", D54: "0", D55: "0", D56: "0", D57: "0", D58: "0", D59: "0",
    D60: "0", D61: "0", D62: "0", D63: "0", D64: "0",
    E65: "0", E66: "0", E67: "0", E68: "0", E69: "0", E70: "0", E71: "0", E72: "0",
    E73: "0", E74: "0", E75: "0", E76: "0", E77: "0", E78: "0", E79: "0", E80: "0",
    E81: "0", E82: "0", E83: "0", E84: "0", E85: "0", E86: "0", E87: "0", E88: "0"
  })

  const [totalScore, setTotalScore] = useState(0)
  const [dimensionAScore, setDimensionAScore] = useState(0)
  const [dimensionBScore, setDimensionBScore] = useState(0)
  const [dimensionCScore, setDimensionCScore] = useState(0)
  const [dimensionDScore, setDimensionDScore] = useState(0)
  const [dimensionEScore, setDimensionEScore] = useState(0)

  const [scoreData, setScoreData] = useState<{ [key: string]: string[] }>({});


  useEffect(() => {
    const loadScoreData = async () => {
      const data = `
A1, 仰躺，頭部保持中線：轉動頭部，四肢對稱。  
A2, 仰躺：將雙手移至中線，手指互相接觸。  
A3, 仰躺：抬頭45°。  
A4, 仰躺：右髖及膝完全屈曲。  
A5, 仰躺：左髖及膝完全屈曲。  
A6, 仰躺：右手伸向玩具，手越過中線。  
A7, 仰躺：左手伸向玩具，手越過中線。  
A8, 仰躺：向右翻身至俯臥。  
A9, 仰躺：向左翻身至俯臥。  
A10, 俯臥：抬頭至直立。  
A11, 俯臥，以前臂支撐：抬頭直立，手肘伸直，胸部抬起。  
A12, 俯臥，以右前臂支撐：完全伸展另一隻手臂向前。  
A13, 俯臥，以左前臂支撐：完全伸展另一隻手臂向前。  
A14, 俯臥：向右翻身至仰臥。  
A15, 俯臥：向左翻身至仰臥。  
A16, 俯臥：利用四肢向右旋轉90°。  
A17, 俯臥：利用四肢向左旋轉90°。  

B18, 仰躺，由檢查者抓住雙手：拉起至坐姿，頭部有控制。  
B19, 仰躺：翻到右側，進而坐起。  
B20, 仰躺：翻到左側，進而坐起。  
B21, 坐於墊上，由治療師支撐胸部：抬頭直立，維持3秒。  
B22, 坐於墊上，由治療師支撐胸部：抬頭至中線，維持10秒。  
B23, 坐於墊上，單手支撐：維持5秒。  
B24, 坐於墊上，雙手自由：維持3秒。  
B25, 坐於墊上，前方有小玩具：向前靠觸碰玩具，無支撐重新直立。  
B26, 坐於墊上：觸碰放置於右後方45°的小玩具，回到原位。  
B27, 坐於墊上：觸碰放置於左後方45°的小玩具，回到原位。  
B28, 右側坐姿：雙手自由，維持5秒。  
B29, 左側坐姿：雙手自由，維持5秒。  
B30, 坐於墊上：控制下落至俯臥。  
B31, 坐於墊上，雙腳朝前：翻轉至右側，進入四點姿勢。  
B32, 坐於墊上，雙腳朝前：翻轉至左側，進入四點姿勢。  
B33, 坐於墊上：旋轉90°，不使用手臂協助。  
B34, 坐於板凳上：雙手與雙腳自由，維持10秒。  

B35, 站立：坐到小板凳上。  
B36, 地面上：坐到小板凳上。  
B37, 地面上：坐到大板凳上。  
C38, 俯臥：向前爬行1.8公尺（6英尺）。  
C39, 四點姿勢：保持，雙手和膝蓋支撐體重，10秒。  
C40, 四點姿勢：達到坐姿，雙手自由。  
C41, 俯臥：達到四點姿勢，雙手和膝蓋支撐體重。  
C42, 四點姿勢：右手向前伸展，手高於肩膀。  
C43, 四點姿勢：左手向前伸展，手高於肩膀。  
C44, 四點姿勢：向前爬行或挪動1.8公尺（6英尺）。  
C45, 四點姿勢：交替爬行向前1.8公尺（6英尺）。  
C46, 四點姿勢：爬上4級台階，使用雙手和膝蓋/腳。  
C47, 四點姿勢：倒退爬下4級台階，使用雙手和膝蓋/腳。  
C48, 坐於墊上：利用手臂支撐，達到高跪姿，雙手自由，保持10秒。  
C49, 高跪姿：利用手臂支撐，達到右膝半跪，雙手自由，保持10秒。  
C50, 高跪姿：利用手臂支撐，達到左膝半跪，雙手自由，保持10秒。  
C51, 高跪姿：雙手自由，跪行向前10步。  

D52, 地面上：抓住大板凳站起來。  
D53, 站立：雙手自由，維持3秒。  
D54, 站立：用一隻手抓住大板凳，抬起右腳，維持3秒。  
D55, 站立：用一隻手抓住大板凳，抬起左腳，維持3秒。  
D56, 站立：雙手自由，維持20秒。  
D57, 站立：抬起左腳，雙手自由，維持10秒。  
D58, 站立：抬起右腳，雙手自由，維持10秒。  
D59, 坐在小板凳上：不使用手臂站起來。  
D60, 高跪姿：右膝半跪站起來，不使用手臂。  
D61, 高跪姿：左膝半跪站起來，不使用手臂。  
D62, 站立：控制下落到地板坐姿，雙手自由。  
D63, 站立：達到蹲姿，雙手自由。  
D64, 站立：雙手自由從地上撿起物品，返回站姿。  

E65, 站立，雙手抓住大板凳：向右橫移5步。  
E66, 站立，雙手抓住大板凳：向左橫移5步。  
E67, 站立，雙手被扶：向前走10步。  
E68, 站立，一隻手被扶：向前走10步。  
E69, 站立：向前走10步。  
E70, 站立：向前走10步，停止，轉身180°，走回來。  
E71, 站立：向後走10步。  
E72, 站立：雙手拿著大物件向前走10步。  
E73, 站立：沿著兩條間距20公分（8英吋）的平行線向前走10步。  
E74, 站立：沿著2公分（3/4英吋）寬的直線向前走10步。  
E75, 站立：右腳先跨過膝蓋高度的棍子。  
E76, 站立：左腳先跨過膝蓋高度的棍子。  
E77, 站立：跑步4.5公尺（15英尺），停止並返回。  
E78, 站立：右腳踢球。  
E79, 站立：左腳踢球。  
E80, 站立：雙腳同時跳高30公分（12英吋）。  
E81, 站立：雙腳同時向前跳30公分（12英吋）。  
E82, 右腳站立：右腳在直徑60公分（24英吋）的圓圈內跳10次。  
E83, 左腳站立：左腳在直徑60公分（24英吋）的圓圈內跳10次。  
E84, 站立，抓住1條欄杆：抓住欄杆向上走4級台階，交替腳步。  
E85, 站立，抓住1條欄杆：抓住欄杆向下走4級台階，交替腳步。  
E86, 站立：交替腳步向上走4級台階。  
E87, 站立：交替腳步向下走4級台階。  
E88, 站在15公分（6英吋）高的台階上：雙腳同時跳下。  
      `;
      const lines = data.split('\n');
      const scoreData: { [key: string]: string[] } = {};

      lines.forEach(line => {
        const match = line.match(/(A|B|C|D|E)\d+\s*,\s*(.*)/);
        if (match) {
          const [, key, description] = match;
          if (!scoreData[key]) {
            scoreData[key] = [];
          }
          scoreData[key].push(description);
        }
      });

      setScoreData(scoreData);
    };

    loadScoreData();
  }, []);

  const renderScoreSelects = (key: string) => {
    return scoreData[key]?.map((description, index) => (
      <div key={`${key}${index}`}>
        {renderScoreSelect(`${key}${index + 1}`, description)}
      </div>
    ));
  };

  useEffect(() => {
    if (patientInfo.dateOfBirth) {
      calculateAge()
    }
  }, [patientInfo.dateOfBirth])

  useEffect(() => {
    calculateTotalScore()
    calculateDimensionAScore()
    calculateDimensionBScore()
    calculateDimensionCScore()
    calculateDimensionDScore()
    calculateDimensionEScore()
  }, [scores])

  const calculateAge = () => {
    const birthDate = new Date(patientInfo.dateOfBirth)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    setPatientInfo(prev => ({ ...prev, chronologicalAge: `${age} years` }))
  }

  const calculateTotalScore = () => {
    const total = Object.values(scores).reduce((sum, score) => {
      const value = parseInt(score)
      return value !== 9 ? sum + (value || 0) : sum
    }, 0)
    setTotalScore(total)
  }

  const calculateDimensionScore = (prefix: string) => {
    return Object.entries(scores).reduce((sum, [key, value]) => {
      if (key.startsWith(prefix) && value !== "9") {
        return sum + parseInt(value)
      }
      return sum
    }, 0)
  }

  const calculateDimensionAScore = () => setDimensionAScore(calculateDimensionScore('A'))
  const calculateDimensionBScore = () => setDimensionBScore(calculateDimensionScore('B'))
  const calculateDimensionCScore = () => setDimensionCScore(calculateDimensionScore('C'))
  const calculateDimensionDScore = () => setDimensionDScore(calculateDimensionScore('D'))
  const calculateDimensionEScore = () => setDimensionEScore(calculateDimensionScore('E'))

  const handlePatientInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPatientInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleScoreChange = (item: string, value: string) => {
    setScores(prev => ({ ...prev, [item]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted", { patientInfo, scores, totalScore, dimensionAScore, dimensionBScore, dimensionCScore, dimensionDScore, dimensionEScore })
    // Here you would typically send the data to a server or perform other actions
  }

  const renderScoreSelect = (item: string, description: string) => (
    <div className="space-y-2" key={item}>
      <Label htmlFor={item}>{`${item}. ${description}`}</Label>
      <Select value={scores[item as keyof typeof scores]} onValueChange={(value) => handleScoreChange(item, value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select score" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">0 = Does not initiate</SelectItem>
          <SelectItem value="1">1 = Initiates</SelectItem>
          <SelectItem value="2">2 = Partially completes</SelectItem>
          <SelectItem value="3">3 = Completes</SelectItem>
          <SelectItem value="9">NT = Not tested</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )

  const downloadJSON = () => {
    const data = {
      patientInfo,
      scores,
      dimensionScores: {
        A: dimensionAScore,
        B: dimensionBScore,
        C: dimensionCScore,
        D: dimensionDScore,
        E: dimensionEScore
      },
      totalScore
    };
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `gmfm_assessment_${patientInfo.name || "unnamed"}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>GMFM-88 and GMFM-66 Score Sheet</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Child&apos;s Name</Label>
              <Input id="name" name="name" value={patientInfo.name} onChange={handlePatientInfoChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="id">ID#</Label>
              <Input id="id" name="id" value={patientInfo.id} onChange={handlePatientInfoChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input id="dateOfBirth" name="dateOfBirth" type="date" value={patientInfo.dateOfBirth} onChange={handlePatientInfoChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="chronologicalAge">Chronological Age</Label>
              <Input id="chronologicalAge" name="chronologicalAge" value={patientInfo.chronologicalAge} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assessmentDate">Assessment Date</Label>
              <Input id="assessmentDate" name="assessmentDate" type="date" value={patientInfo.assessmentDate} onChange={handlePatientInfoChange} required />
            </div>
            <div className="space-y-2">
              <Label>GMFCS Level</Label>
              <RadioGroup name="gmfcsLevel" value={patientInfo.gmfcsLevel} onValueChange={(value) => setPatientInfo(prev => ({ ...prev, gmfcsLevel: value }))}>
                {["I", "II", "III", "IV", "V"].map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <RadioGroupItem value={level} id={`gmfcs${level}`} />
                    <Label htmlFor={`gmfcs${level}`}>{level}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="evaluator">Evaluator&apos;s Name</Label>
              <Input id="evaluator" name="evaluator" value={patientInfo.evaluator} onChange={handlePatientInfoChange} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="testingConditions">Testing Conditions (e.g., room, clothing, time, others present)</Label>
            <Textarea id="testingConditions" name="testingConditions" value={patientInfo.testingConditions} onChange={handlePatientInfoChange} rows={3} />
          </div>
          <Tabs defaultValue="dimensionA">
            <TabsList>
              <TabsTrigger value="dimensionA">A. LYING & ROLLING</TabsTrigger>
              <TabsTrigger value="dimensionB">B. SITTING</TabsTrigger>
              <TabsTrigger value="dimensionC">C. CRAWLING & KNEELING</TabsTrigger>
              <TabsTrigger value="dimensionD">D. STANDING</TabsTrigger>
              <TabsTrigger value="dimensionE">E. WALKING, RUNNING & JUMPING</TabsTrigger>
            </TabsList>
            <TabsContent value="dimensionA" className="space-y-4">
              <h3 className="text-lg font-semibold">A. LYING & ROLLING</h3>
              {renderScoreSelects("A")}
            </TabsContent>
            <TabsContent value="dimensionB" className="space-y-4">
              <h3 className="text-lg font-semibold">B. SITTING</h3>
              {renderScoreSelects("B")}
            </TabsContent>
            <TabsContent value="dimensionC" className="space-y-4">
              <h3 className="text-lg font-semibold">C. CRAWLING & KNEELING</h3>
              {renderScoreSelects("C")}
            </TabsContent>
            <TabsContent value="dimensionD" className="space-y-4">
              <h3 className="text-lg font-semibold">D. STANDING</h3>
              {renderScoreSelects("D")}
            </TabsContent>
            <TabsContent value="dimensionE" className="space-y-4">
              <h3 className="text-lg font-semibold">E. WALKING, RUNNING & JUMPING</h3>
              {renderScoreSelects("E")}
            </TabsContent>
          </Tabs>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="font-semibold">Dimension A Score: {dimensionAScore} / 51</p>
          <p className="font-semibold">Dimension B Score: {dimensionBScore} / 60</p>
          <p className="font-semibold">Dimension C Score: {dimensionCScore} / 42</p>
          <p className="font-semibold">Dimension D Score: {dimensionDScore} / 39</p>
          <p className="font-semibold">Dimension E Score: {dimensionEScore} / 72</p>
          <p className="font-semibold">Total Score: {totalScore} / 264</p>
        </div>
        <div className="flex gap-2">
          <Button type="submit" onClick={handleSubmit}>Save Assessment</Button>
          <Button type="button" onClick={downloadJSON} variant="outline">Download JSON</Button>
        </div>
      </CardFooter>
    </Card>
  )
}