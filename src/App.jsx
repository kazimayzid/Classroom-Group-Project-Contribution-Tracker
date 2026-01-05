import { useState } from "react";
import "./App.css";

const initialMembers = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    points: -7,
    tasks: [],
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    points: 20,
    tasks: [],
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    points: 0,
    tasks: [],
  },
];

function App() {
  const [showAddMember, setShowAddMember] = useState(false);
  const [members, setMembers] = useState(initialMembers);
  const [showContribution, setshowContribution] = useState("");

  function addMember(newMember) {
    setMembers((members) => [...members, newMember]);

    setShowAddMember(false);
  }

  function toggleContribution(member) {
    setshowContribution(showContribution?.id === member.id ? "" : member);
    console.log(member);
  }

  function addTask(task) {
    setMembers((members) =>
      members.map((member) =>
        member.id === task.id
          ? {
              ...member,
              tasks: [...member.tasks, task],
              points:
                task.completedBy === "user"
                  ? member.points - task.points
                  : member.points + task.points,
            }
          : member
      )
    );

    setshowContribution("");
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="font-bold text-3xl text-center mb-8">
        Classroom Group Project Contribution Tracker
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
          <GroupMembers
            showContribution={showContribution}
            onToggleContribution={toggleContribution}
            members={members}
          />
          {showAddMember && <AddMember onAddMember={addMember} />}
          <Button onSmash={() => setShowAddMember((prev) => !prev)}>
            {showAddMember ? "Close" : "+ Add Member"}
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow p-5 space-y-6">
          {showContribution && (
            <AddContribution
              showContribution={showContribution}
              addTask={addTask}
            />
          )}
          <RecentContribution members={members} />
        </div>
      </div>
    </div>
  );
}

export default App;

function GroupMembers({ members, onToggleContribution, showContribution }) {
  return (
    <>
      <h1 className="font-bold text-2xl">Group Members</h1>
      <hr className="border-gray-200" />
      <div className="space-y-3">
        {members.map((member) => (
          <Member
            member={member}
            onToggleContribution={onToggleContribution}
            key={member?.id}
            showContribution={showContribution}
          />
        ))}
      </div>
    </>
  );
}

function Member({ member, onToggleContribution, showContribution }) {
  return (
    <div
      className="flex items-center justify-between 
border border-gray-200 rounded-lg p-3 
hover:border-blue-300 hover:bg-blue-50 transition"
    >
      <div className="flex items-center gap-3">
        <img
          src={member?.image}
          alt={member?.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h1 className="font-semibold">{member?.name}</h1>

          {member.points > 0 && (
            <p className="text-green-600 text-sm">
              +{member.points} Contribution Points
            </p>
          )}

          {member.points < 0 && (
            <p className="text-red-600 text-sm">
              You owe {member.name} {Math.abs(member.points)} Points
            </p>
          )}

          {member.points === 0 && (
            <p className="text-gray-500 text-sm">Contribution is even</p>
          )}
        </div>
      </div>

      <Button onSmash={() => onToggleContribution(member)}>
        {showContribution.id === member.id ? "Close" : "Select"}
      </Button>
    </div>
  );
}

function Button({ children, onSmash }) {
  return (
    <button
      onClick={onSmash}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      {children}
    </button>
  );
}

function AddMember({ onAddMember }) {
  const [memberName, setMemberName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleAddMember(e) {
    e.preventDefault();

    const id = crypto.randomUUID();
    const newMember = {
      name: memberName,
      image: `https://i.pravatar.cc/48?=${id}`,
      id,
      points: 0,
      tasks:[]
    };
    onAddMember(newMember);
  }
  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3">
      <h1 className="font-semibold text-lg">Add Member</h1>
      <hr className="border-gray-200" />

      <form onSubmit={handleAddMember} className="space-y-3">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 
focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 
focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          />
        </div>

        <Button>Add</Button>
      </form>
    </div>
  );
}

function AddContribution({ showContribution, addTask }) {
  const [taskName, setTaskName] = useState("");
  const [points, setPoints] = useState("");
  const [completedBy, setCompletedBy] = useState("user");

  function handleContribution(e) {
    e.preventDefault();
    const task = {
      name: taskName,
      points,
      completedBy,
      id: showContribution.id,
    };
    addTask(task);
  }
  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3">
      <div>
        <h1 className="font-semibold text-lg">
          Contribution for {showContribution.name}
        </h1>
        {showContribution.points < 0 && (
          <p className="text-sm text-red-500">
            {showContribution.name} {showContribution.points} Points down
          </p>
        )}
        {showContribution.points > 0 && (
          <p className="text-sm text-green-500">
            {showContribution.name} has +{showContribution.points} Contribution
            Points
          </p>
        )}
        {showContribution.points === 0 && (
          <p className="text-sm text-gray-500">
            {showContribution.name} has {showContribution.points} Points.
          </p>
        )}
        <hr className="border-gray-200" />
      </div>

      <form onSubmit={handleContribution} className="space-y-3">
        <h1 className="font-semibold">Add Contribution</h1>

        <div>
          <label className="block text-sm font-medium">Task Name</label>
          <input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 
focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Points</label>
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 
focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Completed By</label>
          <select
            value={completedBy}
            onChange={(e) => setCompletedBy(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="user">You</option>
            <option value="member">{showContribution.name}</option>
          </select>
        </div>

        <Button>Add Contribution</Button>
      </form>
    </div>
  );
}

function RecentContribution({ members }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3">
      <h1 className="font-semibold text-lg">Recent Contribution</h1>
      <hr className="border-gray-200" />
      <ul className="text-sm">
        {members.map((member) =>
          member.tasks?.map((task) => (
            <li key={task.name = member.id} className="flex justify-between">
              <span>
                ⭐ {task.completedBy === "user" ? "You" : member.name} completed{" "}
                {task.name}
              </span>
              <span className="text-green-500 font-bold">+{task.points}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
