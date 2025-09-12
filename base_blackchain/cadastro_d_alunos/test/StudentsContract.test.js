const StudentsContract = artifacts.require("StudentsContract");

contract("StudentsContract", (accounts) => {
  let studentsContract;

  // Antes de cada teste, implante uma nova instância do contrato
  beforeEach(async () => {
    studentsContract = await StudentsContract.new();
  });

  it("should enroll a new student", async () => {
    const studentName = "Alice";
    const studentAge = 20;

    // Chamar a função enrollStudent do contrato
    await studentsContract.enrollStudent(studentName, studentAge, { from: accounts[0] });

    // Verificar se o aluno foi corretamente adicionado
    const enrolledStudent = await studentsContract.getEnrolledStudentByAddress.call(accounts[0]);
    assert.equal(enrolledStudent.studentName, studentName, "Student name does not match");
    assert.equal(enrolledStudent.studentAge, studentAge, "Student age does not match");
  });

  it("should reject invalid student age", async () => {
    const studentName = "Bob";
    const invalidStudentAge = 0; // idade inválida

    try {
      await studentsContract.enrollStudent(studentName, invalidStudentAge, { from: accounts[1] });
      assert.fail("The enrollment should have failed due to invalid age");
    } catch (error) {
      assert(error.message.includes("Student age is not valid"), "Expected invalid age error");
    }
  });

  it("should reject invalid student name", async () => {
    const invalidStudentName = ""; // nome inválido
    const studentAge = 21;

    try {
      await studentsContract.enrollStudent(invalidStudentName, studentAge, { from: accounts[2] });
      assert.fail("The enrollment should have failed due to invalid name");
    } catch (error) {
      assert(error.message.includes("Student name is not valid"), "Expected invalid name error");
    }
  });

  it("should prevent re-enrollment of the same student", async () => {
    const studentName = "Charlie";
    const studentAge = 19;

    // Primeiro registro deve funcionar
    await studentsContract.enrollStudent(studentName, studentAge, { from: accounts[3] });

    // Tentativa de registro novamente deve falhar
    try {
      await studentsContract.enrollStudent(studentName, studentAge, { from: accounts[3] });
      assert.fail("The re-enrollment should have failed");
    } catch (error) {
      assert(error.message.includes("Student is already enrolled"), "Expected re-enrollment error");
    }
  });
});
