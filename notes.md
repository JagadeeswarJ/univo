# All tech TODO's for technovista

1. Participant registration 

2. Hackathon registrations - Team members PID's, PSID's preference order, Team name, Contact phone. 
(
    participant side ui - form - enter fields, validate
    admin - /hackathon - show all teams in table
            features - select/reject for next round, 
                       allot problem statements for second round, 
                       filter teams by round no, second round ps
                       excel download
                       jury scoring for selected teams,
)

3. Individual event registrations - codefest, blogathon, debug or die, ML challenge, workshops

4. Hackathon admin panel - selection of teams for second round, jury scoring for selected teams, hackathon second round problem statements selection

5. participant attendance marking - sorted
// on first day of event, to get the participant, get PID, enter in search, edit the attendance.firstDay, idCard
// ui shall have 8 tick icons, one for each attendance field - restrict that using Date.now() - Date of event

DB 
collections needed
a. participants - TVParticipant
b. hackathon-teams - TVHackathon
c. codefect-teams
d. blogathon-teams
e. debug-or-die-teams
f. ml-challenge-teams
g. workshops-teams